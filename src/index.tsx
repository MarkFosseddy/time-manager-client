import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#app")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
