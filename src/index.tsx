import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    return `${expectedOrigin()}/${route}`;
}

/**
 * Returns the expected origin for the current environment.
 */
export function expectedOrigin(): string {
    return isDevelopment() ?
        "http://localhost:3000" :
        window.origin;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const router = createBrowserRouter([{ path: "*", element: <App /> }]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

applyToWindow();
