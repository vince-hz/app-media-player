import { AppContext } from "@netless/window-manager";
import { h } from "../utils/h";

export class MediaPlayer {
    render(context: AppContext) {
        let a = <div style={{ color: "red" }}>Hello world!</div>;
        context.getBox().mountContent(a);
    }
}
