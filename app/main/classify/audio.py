import tensorflow as tf
import numpy as np
import wave


class bigWave(object):

    def __init__(self, file):
        self.file = file
        self.wav = wave.open(self.file)
        self._chann = self.wav.getnchannels()
        self._width = self.wav.getsampwidth()
        self._rate = self.wav.getframerate()
        self._num_frames = self.wav.getnframes()
        self.frames = self.wav.readframes(self._num_frames)
        self.wav.close()

    def array24(self):

        num_samples, remainder = divmod(len(self.frames), self._width * self._chann)

        if self._width < 3:
            raise ValueError("width of file is unusable!")
        elif self._width >= 3:
            a = np.empty((num_samples, self._chann, 4), dtype=np.uint8)
            raw_bytes = np.fromstring(self.frames, dtype=np.uint8)
            a[:, :, :self._width] = raw_bytes.reshape(-1, self._chann, self._width)
            a[:, :, self._width:] = (a[:, :, self._width - 1:self._width] >> 7) * 255
            return a.view('<i4').reshape(a.shape[:-1])
        else:
            # 8 bit samples are stored as unsigned ints; others as signed ints.
            dt_char = 'u' if self._width == 1 else 'i'
            a = np.fromstring(self.frames, dtype='<%s%d' % (dt_char, self._width))
            return a.reshape(-1, self._chann)

    def tensor24(self):
        _np_array = self.array24()
        _tensor = tf.convert_to_tensor(_np_array, dtype=tf.float32)
        return _tensor
