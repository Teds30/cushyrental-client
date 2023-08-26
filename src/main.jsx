import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx'
import './index.css'
import './GlobalCss.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter>
        <GoogleOAuthProvider clientId="289444714327-gufbfi9i1n85ml6one7145gb9eupju84.apps.googleusercontent.com">
            <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </>
)
