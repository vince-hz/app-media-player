import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
    plugins: [
        svelte({
            emitCss: false,
            experimental: {
                useVitePreprocess: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@netless/app-media-player": path.resolve(__dirname, "../app-media-player/src"),
        },
    },
});
