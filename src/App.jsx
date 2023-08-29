import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateAccount from './pages/auth/CreateAccount/CreateAccount'
import SignInPage from './pages/Login/SigninPage'
import ForgotPassword from './pages/Login/ForgotPassword'
import Conversation from './pages/chat/Conversation'
import Chats from './pages/chat/Chats'
// import './App.css'

import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth-hook'

function App() {
    const { userId, login } = useAuth()
    return (
        <AuthContext.Provider
            value={{
                userId: userId,
                login: login,
            }}
        >
            <Routes>
                <Route
                    path="/login"
                    element={
                        <>
                            <h1>Login</h1>
                        </>
                    }
                ></Route>

                <Route path="/chats/" element={<Chats />}></Route>
                <Route
                    path="/chats/:room_id"
                    element={<Conversation />}
                ></Route>

                <Route path="/signinpage" element={<SignInPage />}></Route>
                <Route
                    path="/signinpage/forgotpassword"
                    element={<ForgotPassword />}
                ></Route>

                <Route path="/register" element={<CreateAccount />}></Route>

                <Route
                    path="*"
                    element={<Navigate replace to="/signinpage" />}
                ></Route>
            </Routes>
        </AuthContext.Provider>
    )
}

export default App
