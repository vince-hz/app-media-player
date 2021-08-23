import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
    const isProd = mode === "production";

    return {
        plugins: [
            svelte({
                emitCss: false,
                experimental: {
                    useVitePreprocess: true,
                },
            }),
        ],
        build: {
            lib: {
                entry: path.resolve(__dirname, "src/index.ts"),
                formats: ["es", "cjs"],
                fileName: "main",
                name: "NetlessAppTodo",
            },
            sourcemap: isProd,
            outDir: "dist",
            rollupOptions: {
                external: ["@netless/window-manager"],
                output: { exports: "named" },
            },
            minify: isProd,
        },
    };
});
