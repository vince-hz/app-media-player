import { h } from "tsx-dom";

const ns = "netless-app-media-player-slider";

export interface Slider {
    readonly value: number;
    setValue(value: number): void;
}

export function createSlider({ value = 0, onChange = () => {} } = {}): Slider {
    const hover = <div class={`${ns}-hover`} />;
    const current = <div class={`${ns}-current`} />;
    const track = (
        <div class={`${ns}-track`}>
            <div class={`${ns}-main`}>
                {hover}
                {current}
            </div>
        </div>
    );

    let dragging = false;
    const trackStart = (ev: MouseEvent | TouchEvent): void => {};

    track.addEventListener("mousedown", trackStart);

    return {
        get value() {
            return value;
        },
        setValue(value_) {
            value = value_;
            // TODO: update view
        },
    };
}
