import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    plugins: [reactRefresh()],

    resolve: {
        alias: {
            "@app": "/src",
            "@components": "/src/ui/components",
            "@utils": "/src/utils",
            "@css": "/src/css",
            "@backend": "/src/backend",
        }
    },

    server: {
        port: 1420
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        target: 'es2021',
        chunkSizeWarningLimit: 500
    }
})