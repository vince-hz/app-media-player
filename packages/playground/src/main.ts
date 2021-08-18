import "@netless/window-manager/dist/style.css";
import NetlessAppMediaPlayer from "@netless/app-media-player";
import { WindowManager } from "@netless/window-manager";
import { Room, WhiteWebSdk } from "white-web-sdk";

declare global {
    var room: Room;
    var manager: WindowManager;
}

const env = import.meta.env;

const $ = <T extends string>(sel: T) => document.querySelector(sel);
let $whiteboard = $("#whiteboard")! as HTMLDivElement;

let sdk = new WhiteWebSdk({ appIdentifier: env.VITE_APPID });
WindowManager.register(NetlessAppMediaPlayer);
sdk.joinRoom({
    roomToken: env.VITE_ROOM_TOKEN,
    uuid: env.VITE_ROOM_UUID,
    invisiblePlugins: [WindowManager],
    useMultiViews: true,
}).then(room => {
    window.room = room;
    window.manager = room.getInvisiblePlugin(WindowManager.kind) as WindowManager;

    room.setScenePath('/init');
    WindowManager.mount(room, $whiteboard, undefined);
});
