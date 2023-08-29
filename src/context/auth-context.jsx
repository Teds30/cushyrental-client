import React, { useState } from 'react'

const AuthContext = React.createContext({
    user: {},
    token: '',
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (user, token) => {},
})

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({ id: 1 })
    const [token, setToken] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logoutHandler = () => {
        setIsLoggedIn(false)
        setToken('')
        setUser({})
    }

    const loginHandler = (user, token) => {
        console.log(user)
        setToken(token)
        setUser(user)
        setIsLoggedIn(true)
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                token: token,
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
