import styles from "./style.scss?inline";

import type { NetlessApp } from "@netless/window-manager";
import { MediaPlayer } from "./MediaPlayer";

export interface NetlessAppMediaPlayerAttributes {
    type: "audio" | "video",
    /** url */
    src: string;
    /** default: no poster */
    poster?: string;
    /** default: 0 */
    hostTime?: number;
    /** seconds, default: 0 */
    currentTime?: number;
    /** default: false */
    paused?: boolean;
    /** default: false */
    muted?: boolean;
    /** 0..1, default: 1 */
    volume?: number;
    /** default: false */
    loop?: boolean;
}

/**
 * @example
 * manager.addApp({
 *   kind: MediaPlayer.kind,
 *   options: { scenePath: "/test", title: "music 1" },
 *   attributes: { type: "audio", src: "url/to/a.mp3" }
 * })
 */
const NetlessAppMediaPlayer: NetlessApp<NetlessAppMediaPlayerAttributes> = {
    kind: "MediaPlayer",
    setup(context) {
        const box = context.getBox()!;
        const attrs = context.getAttributes() as any;

        box.mountStyles(styles);

        if (!attrs) {
            throw new Error("[MediaPlayer]: Missing initial attributes.");
        }

        const player = new MediaPlayer();
        context.getBox().mountContent(player.render(attrs));

        (window as any).player = player;
    },
};

export default NetlessAppMediaPlayer;
