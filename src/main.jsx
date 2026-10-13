import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

window.onerror = function (message, source, lineno) {
  document.body.innerHTML =
    "<div style='padding:20px;font-family:sans-serif;color:red'>" +
    "<h2>Erreur du site</h2>" +
    "<p>" + message + "</p>" +
    "<p>Fichier : " + source + "</p>" +
    "<p>Ligne : " + lineno + "</p>" +
    "</div>";
  return true;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
