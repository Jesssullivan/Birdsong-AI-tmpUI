/**
 * class SpectrogramPlayer() provides access to variety of mel spectrogram-related methods,
 * e.g. generating, annotating, audio / visual playback, etc
 *
 * each spectrogram is generated in the browser, using the audio url
 * specified in images.json at:
 * [image_info['audio']]
 */
/**
 * Audio Interface to keep track of mutable types
 * while playing back audio / annotating spectrogram
 */
interface AudioInterface {
    pixels_per_second: number;
    pixels_per_ms: number;
    pan_interval_ms: number;
    audioElement: any;
    playing_audio: boolean;
    playing_audio_timing_id: number;
    current_offset: number;
}
/**
 * AudioPlayer() implements various audio playback controls,
 * bound to the user's keyboard.
 *
 * @RightArrow forward
 * @LeftArrow backward
 * @Spacebar play / pause
 */
declare class AudioPlayer implements AudioInterface {
    pan_interval_ms: number;
    pixels_per_second: number;
    current_offset: number;
    playing_audio: boolean;
    playing_audio_timing_id: any;
    audioElement: any;
    pixels_per_ms: number;
    panSpectrogram: () => void;
    audioEnded: () => void;
    startPlaying: () => void;
    stopPlaying: () => void;
    goForward: () => void;
    goBackward: () => void;
    handleKeyDown: (e: any) => void;
    enableAudioKeys: () => void;
    disableAudioKeys: () => void;
}
interface SpectrogramInterface {
    targetSpectrogramHeight: number;
    targetSampleRate: number;
    stftWindowSeconds: number;
    stftHopSeconds: number;
    topDB: number;
    window_length_samples: number;
    hop_length_samples: number;
    fft_length: number;
}
/**
 *
 * Spectrogram.generate(image_info):
 *
 * generates a new mel spectrogram in the browser.
 * (opposed to fetch from online source, e.g. Macaulay)
 *
 * @returns Image() Element; spectrogram png image to display @ `ImageEl.src`
 * @param image_info parsed image information from images.json
 */
export declare class SpectrogramPlayer extends AudioPlayer implements SpectrogramInterface {
    targetSpectrogramHeight: number;
    targetSampleRate: number;
    stftWindowSeconds: number;
    stftHopSeconds: number;
    topDB: number;
    window_length_samples: number;
    hop_length_samples: number;
    fft_length: number;
    generate: (image_info: {
        [image_info: string]: any;
    }) => Promise<HTMLImageElement>;
}
export {};
