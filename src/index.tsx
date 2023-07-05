import React from "react";
import ReactDOM from "react-dom/client";

import App from "@app/ui/App";

/**
 * Returns true if the current environment is a development environment.
 */
export function isDevelopment(): boolean {
    return true;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
