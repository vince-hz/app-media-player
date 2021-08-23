import esbuild, { Plugin } from "esbuild";
import { Warning } from "svelte/types/compiler/interfaces";
import * as svelte from "svelte/compiler";
import fs from "fs";
import path from "path";

async function share(args: esbuild.OnLoadArgs) {
    let convertMessage = ({ message, start, end }: Warning) => {
        let location;
        if (start && end) {
            let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
            let lineEnd = start.line === end.line ? end.column : lineText.length;
            location = {
                file: filename,
                line: start.line,
                column: start.column,
                length: lineEnd - start.column,
                lineText,
            };
        }
        return { text: message, location };
    };

    // Load the file from the file system
    let source = await fs.promises.readFile(args.path, "utf8");
    let filename = path.relative(process.cwd(), args.path);

    return { source, filename, convertMessage };
}

const sveltePlugin: Plugin = {
    name: "svelte",
    setup({ onResolve, onLoad }) {
        onLoad({ filter: /\.svelte$/, namespace: "file" }, async args => {
            let { source, filename, convertMessage } = await share(args);
            try {
                let { js, warnings } = svelte.compile(source, { filename, css: false });
                let contents = js.code + `//# sourceMappingURL=` + js.map.toUrl();
                return { contents, warnings: warnings.map(convertMessage) };
            } catch (e) {
                return { errors: [convertMessage(e)] };
            }
        });

        onResolve({ filter: /\.svelte\?style$/, namespace: "file" }, args => {
            return {
                path: path.join(args.resolveDir, args.path.slice(0, args.path.lastIndexOf("?"))),
                namespace: "svelte-style",
            };
        });

        onLoad({ filter: /()/, namespace: "svelte-style" }, async args => {
            let { source, filename, convertMessage } = await share(args);
            try {
                let { css } = svelte.compile(source, { filename });
                let contents = css.code + `/*# sourceMappingURL=${css.map.toUrl()} */`;
                return { contents, loader: "text" };
            } catch (e) {
                return { errors: [convertMessage(e)] };
            }
        });
    },
};

esbuild
    .build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        plugins: [sveltePlugin],
        format: "esm",
        outfile: "dist/index.mjs",
    })
    .catch(() => process.exit(1));
