import React, { useState, useEffect, useCallback } from 'react'

const AuthContext = React.createContext({
    user: {},
    token: '',
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (user, token) => {},
})

export const AuthContextProvider = (props) => {
    const { user, token, loginHandler, logoutHandler, isLoggedIn } = useAuth()

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
