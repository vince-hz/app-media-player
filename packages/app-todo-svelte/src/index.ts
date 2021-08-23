import type { NetlessApp } from "@netless/window-manager";
import TodoApp from "./TodoApp.svelte";

export interface NetlessAppTodoAttributes {
    current: string;
    list: string[];
}

const NetlessAppTodo: NetlessApp<NetlessAppTodoAttributes> = {
    kind: "Todo",
    setup(context) {
        let attrs: NetlessAppTodoAttributes = {
            current: "",
            list: [],
            ...context.getAttributes(),
        };

        const el = document.createElement("div");
        el.classList.add("netless-todo-app-container");

        const app = new TodoApp({ target: el, props: attrs });

        const box = context.getBox();
        box.mountContent(el);

        app.$on("update", ({ detail }: { detail: NetlessAppTodoAttributes }) => {
            if (context.getIsWritable()) {
                let a: Record<string, any> = context.getAttributes()!;
                for (let [k, v] of Object.entries(detail)) {
                    if (a[k] !== v) context.updateAttributes([k], v);
                }
                attrs = detail;
            } else {
                // restore to previous state
                app.$set(attrs);
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
