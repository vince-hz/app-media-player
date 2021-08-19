import styles from "./style.scss?inline";

import { h } from "tsx-dom";
import { NetlessApp } from "@netless/window-manager";

const ns = "netless-app-media-player";

interface NetlessAppMediaPlayerAttributes {
    type: "audio" | "video";
    src: string;
    paused?: boolean;
}

type State = Required<NetlessAppMediaPlayerAttributes>;

const defaultAttributes: State = {
    type: "video",
    src: "",
    paused: true,
};

const NetlessAppMediaPlayer: NetlessApp<NetlessAppMediaPlayerAttributes> = {
    kind: "MediaPlayer",
    setup(context) {
        let box = context.getBox();
        let state = {
            ...defaultAttributes,
            ...context.getAttributes(),
        };

        let player = h(state.type, null) as HTMLAudioElement | HTMLVideoElement;
        let content = <div class={`${ns}-content`}>{player}</div>;

        box.mountStyles(styles);
        box.mountContent(content);

        player.src = state.src;
        if (!state.paused) player.play();
    },
};

export default NetlessAppMediaPlayer;
