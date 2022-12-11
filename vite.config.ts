import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    plugins: [reactRefresh()],

    resolve: {
        alias: {
            "@app": "/src",
            "@components": "/src/components",
            "@pages": "/src/pages",
            "@css": "/src/css",
        }
    },

    server: {
        port: 1420
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        target: 'es5',
        chunkSizeWarningLimit: 500
    }
})