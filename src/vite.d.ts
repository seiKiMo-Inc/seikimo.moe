/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DEV_URL: string;
    readonly VITE_DEV_WSS: string;
    readonly VITE_TURNSTILE_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
