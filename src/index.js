import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material";

//For setting dark mode
// const htmlElement = document.getElementById("htmlid");
// document.documentElement.style.setProperty("--color-theme", "dark");
// htmlElement.classList.add("dark");

//For setting light mode
// document.documentElement.style.setProperty("--color-theme", "white");
// htmlElement.classList.remove("dark");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
