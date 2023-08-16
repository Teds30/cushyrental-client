import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./pages/auth/CreateAccount/CreateAccount";
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
      <Route path="/register" element={<CreateAccount />}></Route>
      <Route path="*" element={<Navigate replace to="/register" />}></Route>
    </Routes>
  );
}

export default App;
