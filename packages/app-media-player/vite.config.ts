import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
    const isProd = mode === "production";

    return {
        build: {
            lib: {
                entry: path.resolve(__dirname, "src/index.ts"),
                formats: ["es", "cjs"],
                fileName: "main",
                name: "NetlessAppDocsViewer",
            },
            sourcemap: isProd,
            outDir: "dist",
            rollupOptions: {
                external: ["@netless/window-manager"],
            },
            minify: isProd,
        },
    };
});
