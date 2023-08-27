import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NotifyProvider from "./components/Feedback/NotifyProvider.jsx";
import { AuthContextProvider } from "./context/auth-context.jsx";

import App from "./App.jsx";
import "./index.css";
import "./GlobalCss.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <NotifyProvider>
        <GoogleOAuthProvider clientId="289444714327-s692ob9granvnk1pr1lk0csn44fpptqu.apps.googleusercontent.com">
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </NotifyProvider>
    </BrowserRouter>
  </>
);
