export type Props = Record<string, any>;

export function isProps(o: any): o is Props {
    return typeof o === "object" && o !== null;
}

// based on https://github.com/yisar/fre/blob/master/src/dom.ts
// but I don't need patching & svg
export function h(tag: string, props: Props | null = {}, ...children: (string | Node)[]) {
    const dom = document.createElement(tag);
    for (let name in props) {
        const value = props[name];
        if (name === "style" && isProps(value)) {
            for (const k in value) (dom as any)[name][k] = value[k] || "";
        } else if (name.startsWith("on")) {
            name = name.slice(2).toLowerCase();
            dom.addEventListener(name, value);
        } else if (name in dom) {
            (dom as any)[name] = value;
        } else {
            dom.setAttribute(name, value);
        }
    }
    dom.append(...children);
    return dom;
}
