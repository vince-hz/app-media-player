import type { NetlessApp } from "@netless/window-manager";
import TodoApp from "./TodoApp.svelte";

export interface NetlessAppTodoAttributes {
    current: string;
    list: string[];
}

const NetlessAppTodo: NetlessApp<NetlessAppTodoAttributes> = {
    kind: "Todo",
    setup(context) {
        const attrs: NetlessAppTodoAttributes = {
            current: "",
            list: [],
            ...context.getAttributes(),
        };
        context.setAttributes(attrs);

        const el = document.createElement("div");
        el.classList.add("netless-todo-app-container");

        const app = new TodoApp({ target: el, props: attrs });

        const box = context.getBox();
        box.mountContent(el);

        app.$on("update", ({ detail }: { detail: NetlessAppTodoAttributes }) => {
            let a: Record<string, any> = context.getAttributes()!;
            for (let [k, v] of Object.entries(detail)) {
                if (a[k] !== v) context.updateAttributes([k], v);
            }
        });
        context.emitter.on("attributesUpdate", attrs => {
            attrs && app.$set(attrs);
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
