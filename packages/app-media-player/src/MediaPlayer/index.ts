import { ReadonlyTeleBox } from "@netless/window-manager";
import debounceFn from "debounce-fn";
import { h } from "../utils/h";
import { SideEffectManager } from "../utils/SideEffectManager";

export interface MediaPlayerProps {
    box: ReadonlyTeleBox;
    value: number;
    inc(value: number): void;
    dec(value: number): void;
}

export class MediaPlayer {
    public $content!: HTMLElement;

    public value: number;
    protected props: MediaPlayerProps;

    public constructor(props: MediaPlayerProps) {
        this.value = props.value;
        this.props = props;
        this.render();
    }

    public mount() {
        this.props.box.mountContent(this.$content);
    }

    public unmount() {
        this.$content.remove();
    }

    protected renderIncButton() {
        return h("button", { onclick: () => this.props.inc(this.value) }, "+");
    }

    protected renderDecButton() {
        return h("button", { onclick: () => this.props.dec(this.value) }, "-");
    }

    protected $value!: HTMLSpanElement;
    protected renderValue() {
        if (!this.$value) {
            const $value = h('span', null, String(this.props.value));
            this.$value = $value;
        } else {
            this.$value.textContent = String(this.value);
        }
        return this.$value;
    }

    public setValue(value: number) {
        console.log('set value', value);
        this.value = value;
        this.renderValue();
    }

    public render(): HTMLElement {
        if (!this.$content) {
            const $content = h('div', null,
                this.renderIncButton(),
                this.renderValue(),
                this.renderDecButton(),
            );
            $content.className = this.wrapClassName('content');
            this.$content = $content;
        }
        return this.$content;
    }

    protected sideEffect = new SideEffectManager();

    protected debounce(fn: () => void, wait: number): () => void {
        const debounced = debounceFn(fn, { wait });
        this.sideEffect.addDisposer(() => debounced.cancel());
        return debounced;
    }

    protected wrapClassName(className: string) {
        return `netless-app-media-player-${className}`;
    }
}
