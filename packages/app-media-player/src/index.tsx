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
    volume?: number;
    muted?: boolean;
    currentTime?: number;
    hostTime?: number;
    loop?: boolean;
}

type State = Required<NetlessAppMediaPlayerAttributes>;

const defaultAttributes: State = {
    type: "video",
    src: "",
    paused: true,
    volume: 1,
    muted: false,
    currentTime: 0,
    hostTime: 0,
    loop: false,
};

const NetlessAppMediaPlayer: NetlessApp<NetlessAppMediaPlayerAttributes> = {
    kind: "MediaPlayer",
    setup(context) {
        context.getIsWritable();

        let box = context.getBox();
        let state = {
            ...defaultAttributes,
            ...context.getAttributes(),
        };

        if (!state.src) {
            throw new Error("[MediaPlayer]: Missing 'src' attribute.");
        }

        let player = h(state.type, null) as HTMLAudioElement | HTMLVideoElement;
        const updatePlayer = (state: State) => {
            player.muted = state.muted;
            player.volume = state.volume;
            player.src = state.src;
            player.currentTime = state.currentTime;
            state.paused ? player.pause() : player.play();
        };
        updatePlayer(state);

        let progressBarCurrent = <div class={`${ns}-current`} style={{ width: 0 }} />;
        let progressBar = <div class={`${ns}-progress`}>{progressBarCurrent}</div>;
        const updateProgressBar = (percent: number) => {
            progressBarCurrent.style.width = Math.round(percent * 100) + "%";
        };
        progressBar.addEventListener("click", e => {
            console.log(e);
        });
        player.addEventListener("timeupdate", () => {
            updateProgressBar(player.currentTime / player.duration);
        });

        let playBtn = (<img class={`${ns}-play-pause`} draggable={false} />) as HTMLImageElement;
        const updatePlayBtn = (paused: boolean) => {
            playBtn.src = paused ? playSVG : pauseSVG;
        };
        updatePlayBtn(state.paused);

        let content = (
            <div class={`${ns}-content`}>
                {player}
                <div class={`${ns}-controls`}>
                    {progressBar}
                    <div class={`${ns}-actions`}>{playBtn}</div>
                </div>
            </div>
        );

        box.mountStyles(styles);
        box.mountContent(content);

        if (!state.paused) {
            player.play().catch(e => {
                console.log("failed", e);
                player.muted = true;
                player.play();
            });
        }

        playBtn.addEventListener("click", () => {
            context.updateAttributes(["paused"], !state.paused);
        });

        context.emitter.on("attributesUpdate", attrs => {
            if ((state.paused = attrs!.paused!)) {
                player.pause();
                updatePlayBtn(state.paused);
            } else {
                player.play();
                updatePlayBtn(state.paused);
            }
        });
    },
};

export default NetlessAppMediaPlayer;
