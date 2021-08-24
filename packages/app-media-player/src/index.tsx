import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import ReactDOM from "react-dom";
import { MediaPlayer } from "./components/MediaPlayer";

import styles from "./style.css?inline";

import { defaultAttributes, Kind } from "./constants";
import type { Attributes } from "./types";

export { setOptions } from "./options";
export type { MediaPlayerOptions } from "./options";
export { Version } from "./constants";
export type { Attributes as NetlessAppMediaPlayerAttributes };

const NetlessAppMediaPlayer: NetlessApp<Attributes> = {
    kind: Kind,
    setup(context) {
        let attrs = context.getAttributes();
        if (!attrs || !attrs.src) {
            return context.emitter.emit("destroy", {
                error: new Error(`[MediaPlayer]: Missing 'attributes'.'src'.`),
            });
        }
        attrs = { ...defaultAttributes, ...attrs };

        const box = context.getBox();
        box.mountStyles(styles);

        const container = document.createElement("div");
        container.classList.add("netless-app-media-player-container");
        ReactDOM.render(<MediaPlayer context={context} />, container);

        box.mountContent(container);

        context.emitter.on("destroy", () => {
            console.log("[MediaPlayer]: destroy");
            ReactDOM.unmountComponentAtNode(container);
        });
    },
};

export default NetlessAppMediaPlayer;
