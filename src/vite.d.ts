/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DEV_URL: string;
    readonly VITE_DEV_WSS: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
