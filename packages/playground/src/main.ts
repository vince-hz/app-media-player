import "@netless/window-manager/dist/style.css";
import { WindowManager } from "@netless/window-manager";
import { Room, WhiteWebSdk } from "white-web-sdk";

import NetlessAppMediaPlayer, {
    NetlessAppMediaPlayerAttributes,
    setOptions,
} from "@netless/app-media-player";
import "video.js/dist/video-js.min.css";
setOptions({ verbose: true });

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

    $("#add-app")!.addEventListener("click", () => {
        manager.addApp({
            kind: NetlessAppMediaPlayer.kind,
            attributes: <NetlessAppMediaPlayerAttributes>{
                src: "https://beings.oss-cn-hangzhou.aliyuncs.com/test/aaa59a55-81ff-45e8-8185-fd72c695def4/1606277539701637%E7%9A%84%E5%89%AF%E6%9C%AC.mp4",
                type: "video/mp4",
            },
        });
    });
});
