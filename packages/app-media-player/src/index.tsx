import styles from "./style.scss?inline";

import playSVG from "./icons/play.svg";
import pauseSVG from "./icons/pause.svg";

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

        let progressBar = <div class={`${ns}-current`} style={{ width: 0 }} />;
        let indicator = <span class={`${ns}-indicator`} />;

        player.addEventListener("timeupdate", () => {
            let percent = (((100 * player.currentTime) / player.duration) | 0) + "%";
            progressBar.style.width = percent;
            indicator.style.left = percent;
        });

        let playBtn = (<img class={`${ns}-play-pause`} draggable={false} />) as HTMLImageElement;
        playBtn.src = state.paused ? playSVG : pauseSVG;

        let controls = (
            <div class={`${ns}-controls`}>
                <div class={`${ns}-progress`}>
                    {progressBar}
                    {indicator}
                </div>
                <div class={`${ns}-actions`}>{playBtn}</div>
            </div>
        );
        let content = (
            <div class={`${ns}-content`}>
                {player}
                {controls}
            </div>
        );

        box.mountStyles(styles);
        box.mountContent(content);

        player.src = state.src;
        if (!state.paused) {
            player.play().catch(() => {
                player.muted = true;
                player.play();
            });
        }

        playBtn.addEventListener("click", () => {
            context.updateAttributes(["paused"], !state.paused);
        });

        context.emitter.on("attributesUpdate", attrs => {
            if ((state.paused = attrs!.paused!)) {
                player.play();
                playBtn.src = pauseSVG;
            } else {
                player.pause();
                playBtn.src = playSVG;
            }
        });
    },
};

export default NetlessAppMediaPlayer;
