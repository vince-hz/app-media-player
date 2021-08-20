import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import ReactDOM from "react-dom";
import { MediaPlayer } from "./components/MediaPlayer";

import styles from "./style.css?inline";

import { Kind } from "./constants";
import { Attributes } from "./types";

export { setOptions } from "./options";
export type { MediaPlayerOptions } from "./options";
export { Version } from "./constants";
export type { Attributes as NetlessAppMediaPlayerAttributes };

const defaultAttributes: Attributes = {
    src: "",
    currentTime: 0,
    hostTime: 0,
    muted: false,
    paused: true,
    volume: 1,
};

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
        context.setAttributes(attrs);

        const box = context.getBox();
        box.mountStyles(styles);

        const container = document.createElement("div");
        container.id = "app-media-player";
        container.classList.add("netless-app-media-player-container");
        ReactDOM.render(<MediaPlayer context={context} />, container);

        box.mountContent(container);
    },
};

export default NetlessAppMediaPlayer;
