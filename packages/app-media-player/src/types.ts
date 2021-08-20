import type { AppContext } from "@netless/window-manager";

export interface Props {
    context: AppContext<Attributes>;
}

export interface Attributes {
    /** 视频的 mime type，不填则根据 `src` 后缀判断 */
    type?: string;
    /** 视频文件地址，空字符串时不播放 */
    src: string;
    /** 封面 */
    poster?: string;
    /**
     * host 的当前 `room.calibrationTimestamp`，用于同步
     * @example
     * hostCurrentTime = (room.calibrationTimestamp - hostTime) / 1000 + currentTime
     */
    hostTime: number;
    /** 当前播放位置秒数，默认 0 */
    currentTime: number;
    /** 是否暂停中，默认 false */
    paused: boolean;
    /** 是否静音中，默认 false */
    muted: boolean;
    /** 音量 0..1，默认 1 */
    volume: number;
}

export type Keys = keyof Attributes;
