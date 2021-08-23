import type { Attributes } from "./types";

/** 插件 ID */
export const Kind = "MediaPlayer";

export const Version = "0.1.0-alpha.1";

export const defaultAttributes: Attributes = {
    src: "",
    currentTime: 0,
    hostTime: 0,
    muted: false,
    paused: true,
    volume: 1,
};
