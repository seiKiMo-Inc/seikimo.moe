import React from "react";
import ReactDOM from "react-dom/client";

import App from "@app/ui/App";

export const development = false;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
