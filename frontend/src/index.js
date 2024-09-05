import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { MyVariableProvider } from "./context/email";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyVariableProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyVariableProvider>
  </React.StrictMode>
);
