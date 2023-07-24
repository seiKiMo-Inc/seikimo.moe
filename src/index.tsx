import React from "react";
import ReactDOM from "react-dom/client";

import { applyToWindow } from "@utils/general";

import App from "@app/ui/App";

/**
 * Returns true if the current environment is a development environment.
 */
export function isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
}

/**
 * Returns a new call to the specified route.
 *
 * @param route The route to call.
 */
export function newCall(route: string): string {
    return `${isDevelopment() ?
        "http://localhost:3000" :
        "https://seikimo.moe"}/${route}`;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

applyToWindow();
