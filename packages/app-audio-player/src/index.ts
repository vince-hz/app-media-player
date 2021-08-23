import type { NetlessApp } from "@netless/window-manager";
import styles from "./AudioPlayer.svelte?style";

export interface NetlessAppAudioPlayerAttributes {}

const NetlessAppAudioPlayer: NetlessApp<NetlessAppAudioPlayerAttributes> = {
    kind: "AudioPlayer",
    setup(context) {
        let box = context.getBox();
        console.log(box, styles);
    },
};

export default NetlessAppAudioPlayer;
