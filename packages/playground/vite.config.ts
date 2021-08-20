import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            '@netless/app-media-player':
                path.resolve(__dirname, '../app-media-player/src')
        }
    }
});
