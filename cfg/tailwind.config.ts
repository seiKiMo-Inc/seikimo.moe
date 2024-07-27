import { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{html,js,tsx,ts}"],
    mode: "jit",
    theme: {
        extend: {}
    },
    darkMode: "class",
    plugins: []
} satisfies Config;
