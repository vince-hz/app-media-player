import { h } from "../utils/h";

const cls = (name: string) => `netless-app-media-player-${name}`;

export class MediaPlayer {
    render(attrs: { src: string; }) {
        return (
            <div className={cls("content")}>
                <div className={cls("media")}>
                    <video src={attrs.src} playsinline ref={this.setupVideo}></video>
                </div>
                <div className={cls("controls")}>
                    <div className={cls("progress-bar")}>
                        &lt;progress bar&gt;
                    </div>
                </div>
            </div>
        );
    }

    setupVideo = (video: HTMLVideoElement) => {
        console.log(video);
    };
}
