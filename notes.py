# HEADS UP: we need tf-nightly to run this (until tensorflow 2.4 is released):
# `pip install tf-nightly`
# See here: https://www.tensorflow.org/lite/guide/ops_select#python
import json
import librosa
import numpy as np
import tensorflow as tf

SAMPLE_RATE = 44100
MODEL_INPUT_SAMPLE_COUNT = 44100
WINDOW_STEP_SAMPLE_COUNT = 22050
tflite_model_fp = "demos/models/lite/model.tflite"
labels_fp = "demos/models/lite/labels.json"
# Load in the map from integer id to species code
with open(labels_fp) as f:
    label_map = json.load(f)
# Load TFLite model and allocate tensors.
interpreter = tf.lite.Interpreter(model_path=tflite_model_fp)
interpreter.allocate_tensors()
# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
print("Waveform Input Shape: %s" % input_details[0]['shape'])
print("Sample Rate Input Shape: %s" % input_details[1]['shape'])
print("Output shape: %s" % output_details[0]['shape'])
# Load in an audio file
audio_fp = "etc/FullSong/Recording.wav"
# todo: investigate this- is not tf-nightly? offline the interpreter wheel interpreter = tf.lite.Interpreter(
#  model_path=tflite_model_fp) INFO: Created TensorFlow Lite delegate for select TF ops. 2020-09-21 18:19:23.668974:
#  I tensorflow/core/platform/cpu_feature_guard.cc:142] This TensorFlow binary is optimized with oneAPI Deep Neural
#  Network Library (oneDNN)to use the following CPU instructions in performance-critical operations:  AVX2 FMA To
#  enable them in other operations, rebuild TensorFlow with the appropriate compiler flags. 2020-09-21
#  18:19:23.700153: I tensorflow/core/platform/profile_utils/cpu_utils.cc:104] CPU Frequency: 2699825000 Hz
#  2020-09-21 18:19:23.700899: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x4a3fe80 initialized
#  for platform Host (this does not guarantee that XLA will be used). Devices: 2020-09-21 18:19:23.701149: I
#  tensorflow/compiler/xla/service/service.cc:176]   StreamExecutor device (0): Host, Default Version INFO:
#  TfLiteFlexDelegate delegate: 2 nodes delegated out of 109 nodes with 1 partitions.

samples, _ = librosa.load(audio_fp, sr=SAMPLE_RATE, mono=True)
# Do we need to pad with zeros?
if samples.shape[0] < MODEL_INPUT_SAMPLE_COUNT:
    samples = np.concatenate([samples, np.zeros([MODEL_INPUT_SAMPLE_COUNT - samples.shape[0]], dtype=np.float32)])
# How many windows do we have for this sample?
num_windows = (samples.shape[0] - MODEL_INPUT_SAMPLE_COUNT) // WINDOW_STEP_SAMPLE_COUNT + 1
# We'll aggregate the outputs from each window in this list
window_outputs = []
# Pass each window
for window_idx in range(num_windows):
    # Construct the window
    start_idx = window_idx * WINDOW_STEP_SAMPLE_COUNT
    end_idx = start_idx + MODEL_INPUT_SAMPLE_COUNT
    window_samples = samples[start_idx:end_idx]
    # Classify the window
    interpreter.set_tensor(input_details[0]['index'], window_samples)
    interpreter.set_tensor(input_details[1]['index'], tf.constant(SAMPLE_RATE, dtype=tf.float32))
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])[0]
    # Save off the classification scores
    window_outputs.append(output_data)
window_outputs = np.array(window_outputs)
# Take an average over all the windows
average_scores = window_outputs.mean(axis=0)
# Print the predictions
label_predictions = np.argsort(average_scores)[::-1]
print("Class Predictions:")
for i in range(10):
    label = label_predictions[i]
    score = average_scores[label]
    species_code = label_map[label]
    print("\t%7s %0.3f" % (species_code, score))
