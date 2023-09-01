import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateAccount from './pages/auth/CreateAccount/CreateAccount'
import SignInPage from './pages/Login/SignInPage'
import ForgotPassword from './pages/Login/ForgotPassword'
import Conversation from './pages/chat/Conversation'
import Chats from './pages/chat/Chats'
import CreateUnit from './pages/landlord/ManageUnits/CreateUnit/CreateUnit'
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

            <Route path="/chats/" element={<Chats />}></Route>
            <Route path="/chats/:room_id" element={<Conversation />}></Route>

            <Route path="/signinpage" element={<SignInPage />}></Route>
            <Route
                path="/signinpage/forgotpassword"
                element={<ForgotPassword />}
            ></Route>

            <Route path="/register" element={<CreateAccount />}></Route>

            <Route path='/manage_unit/create_unit' element={<CreateUnit/>}></Route>
            <Route
                path="*"
                element={<Navigate replace to="/signinpage" />}
            ></Route>
        </Routes>
    )
}

export default App
