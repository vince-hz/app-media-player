import type { NetlessApp } from "@netless/window-manager";
import AudioPlayer from "./AudioPlayer.svelte";
import styles from "./AudioPlayer.svelte?style";

export interface NetlessAppAudioPlayerAttributes {}

const NetlessAppAudioPlayer: NetlessApp<NetlessAppAudioPlayerAttributes> = {
    kind: "AudioPlayer",
    setup(context) {
        let box = context.getBox();
        box.mountStyles(styles);
        let app = new AudioPlayer({ target: box.$content! });

        (window as any).app2 = app;
    },
};

export default NetlessAppAudioPlayer;
