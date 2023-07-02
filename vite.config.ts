// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import postcss from "./cfg/postcss.config";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {postcss},

    server: {
        port: 1420
    },

    build: {
        outDir: "dist",
        emptyOutDir: true,
        target: "es2021",
        chunkSizeWarningLimit: 500
    }
})