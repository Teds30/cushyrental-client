import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
            <Route
                path="/register"
                element={
                    <>
                        <h1>Register</h1>
                    </>
                }
            ></Route>
            <Route path="*" element={<Navigate replace to="/login" />}></Route>
        </Routes>
    )
}

export default App
