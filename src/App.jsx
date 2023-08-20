import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./pages/auth/CreateAccount/CreateAccount";
import SignInPage from "./pages/Login/SigninPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
// import './App.css'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <h1>Login</h1>
          </>
        }
      ></Route>

      <Route path="/signinpage" element={<SignInPage />}></Route>
      <Route path="/signinpage/forgotpassword" element={<ForgotPassword />}></Route>

      <Route path="/register" element={<CreateAccount />}></Route>
      <Route path="*" element={<Navigate replace to="/signinpage" />}></Route>


    </Routes>
  );
}

export default App;
