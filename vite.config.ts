// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

const VARS = {
    NODE_ENV: undefined
};

export default defineConfig({
    plugins: [react(), tailwindcss(), svgr(), tsconfigPaths(), EnvironmentPlugin(VARS)],

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
