import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import NotifyProvider from './components/Feedback/NotifyProvider.jsx'
import { CreateUnitContextProvider } from './context/create-unit-context.jsx'

import App from './App.jsx'
import './index.css'
import './GlobalCss.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            <BrowserRouter>
                <NotifyProvider>
                    <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENTID}
                    >
                        <CreateUnitContextProvider>
                            <App />
                        </CreateUnitContextProvider>
                    </GoogleOAuthProvider>
                </NotifyProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </>
)
