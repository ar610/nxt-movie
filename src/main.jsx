import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
