// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import viteSvgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

import postcss from "./cfg/postcss.config";

const VARS = {
    NODE_ENV: undefined
};

export default defineConfig({
    plugins: [react(), viteSvgr(), tsconfigPaths(), EnvironmentPlugin(VARS)],
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
