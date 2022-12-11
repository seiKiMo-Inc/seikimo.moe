import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from "vite-tsconfig-paths"
import * as path from 'path'

export default defineConfig({
    plugins: [reactRefresh(), tsconfigPaths()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }
})