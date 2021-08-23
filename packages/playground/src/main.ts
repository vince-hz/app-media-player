import "@netless/window-manager/dist/style.css";
import { WindowManager } from "@netless/window-manager";
import { Room, WhiteWebSdk } from "white-web-sdk";

import NetlessAppMediaPlayer, { setOptions } from "@netless/app-media-player";
import type { NetlessAppMediaPlayerAttributes } from "@netless/app-media-player";
import "video.js/dist/video-js.min.css";
setOptions({ verbose: true });

import NetlessAppTodo from "@netless/app-todo-svelte";
import type { NetlessAppTodoAttributes } from "@netless/app-todo-svelte";

declare global {
    var room: Room;
    var manager: WindowManager;
}

const env = import.meta.env;

const $ = <T extends string>(sel: T) => document.querySelector(sel);
let $whiteboard = $("#whiteboard")! as HTMLDivElement;
let $info = $("#info")! as HTMLDivElement;

let sdk = new WhiteWebSdk({ appIdentifier: env.VITE_APPID });
WindowManager.register(NetlessAppMediaPlayer);
WindowManager.register(NetlessAppTodo);
sdk.joinRoom({
    roomToken: env.VITE_ROOM_TOKEN,
    uuid: env.VITE_ROOM_UUID,
    invisiblePlugins: [WindowManager],
    useMultiViews: true,
}).then(room => {
    window.room = room;
    window.manager = room.getInvisiblePlugin(WindowManager.kind) as WindowManager;

    room.setScenePath("/init");
    WindowManager.mount(room, $whiteboard, undefined);

    $info.textContent = "loaded.";

    $("#add-audio")!.addEventListener("click", () => {
        manager.addApp({
            kind: NetlessAppMediaPlayer.kind,
            attributes: <NetlessAppMediaPlayerAttributes>{
                src: "https://beings.oss-cn-hangzhou.aliyuncs.com/test/2a90e310-1904-4a9a-8a86-9d6f3f4f8a78/%E9%99%88%E7%BB%AE%E8%B4%9E%20-%20%E5%A4%A9%E5%A4%A9%E6%83%B3%E4%BD%A0.mp3",
                type: "audio/mp3",
            },
        });
    });
    $("#add-video")!.addEventListener("click", () => {
        manager.addApp({
            kind: NetlessAppMediaPlayer.kind,
            attributes: <NetlessAppMediaPlayerAttributes>{
                src: "https://beings.oss-cn-hangzhou.aliyuncs.com/test/aaa59a55-81ff-45e8-8185-fd72c695def4/1606277539701637%E7%9A%84%E5%89%AF%E6%9C%AC.mp4",
                type: "video/mp4",
            },
        });
    });
    $("#add-todo-svelte")!.addEventListener("click", () => {
        manager.addApp({
            kind: NetlessAppTodo.kind,
            attributes: <NetlessAppTodoAttributes>{
                current: "hello, world!",
                list: ["example item"],
            },
        });
    });
});
