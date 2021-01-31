export declare enum Level {
    NONE = 0,
    WARN = 5,
    INFO = 10,
    DEBUG = 20
}
export declare const verbosity: Level;
declare const log: (msg: string, prefix?: string, level?: Level) => void;
declare const logWithDuration: (msg: string, startTime: number, prefix?: string, level?: Level) => void;
export { log, logWithDuration };
