import type { NetlessApp } from "@netless/window-manager";
import TodoApp from "./TodoApp.svelte";

export interface NetlessAppTodoAttributes {
    current: string;
    list: string[];
}

type PartialAttrs = Partial<NetlessAppTodoAttributes>;

const NetlessAppTodo: NetlessApp<NetlessAppTodoAttributes> = {
    kind: "Todo",
    setup(context) {
        const attrs = { current: "", list: [], ...context.getAttributes() };
        context.setAttributes(attrs);

        const el = document.createElement("div");
        el.classList.add("netless-todo-app-container");
        const app = new TodoApp({ target: el, props: attrs });

        const box = context.getBox();
        box.mountContent(el);

        const update = (k: string, v: any) => {
            let a: Record<string, any> = context.getAttributes() || {};
            if (a[k] !== v) context.updateAttributes([k], v);
        };
        for (const k in attrs) {
            app.$on(`update:${k}`, ({ detail }) => {
                update(k, detail);
            });
        }
        context.emitter.on("attributesUpdate", (attrs: PartialAttrs = {}) => {
            for (const k in attrs) {
                app.$set({ [k]: attrs[k as keyof PartialAttrs] });
            }
        });
        context.emitter.on("destroy", () => {
            app.$destroy();
        });

        if (import.meta.env.DEV) {
            (window as any).app = app;
        }
    },
};

export default NetlessAppTodo;
