import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "./popup.css"
import "../src/components/ProfilePage/Profilepage.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { StyledEngineProvider } from "@mui/material"
import { Provider } from "react-redux"
import store from "./store"

import { GoogleOAuthProvider } from "@react-oauth/google"
const clientId = "341526416859-a1u3gf1rl41o6vj5nvl0bs3ac00sljue.apps.googleusercontent.com"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    {/* <React.StrictMode> */}
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
