import { useCallback, useEffect, useState } from 'react'
import useHttp from '../http-hook'

const useAuth = () => {
    const { sendRequest, isLoading } = useHttp()

    const [user, setUser] = useState()
    const [token, setToken] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logoutHandler = () => {
        setIsLoggedIn(false)
        setToken(null)
        setUser(null)
        localStorage.removeItem('userData')
    }

    const loginHandler = useCallback(({ user = {}, token = '' }) => {
        setToken(token)
        setUser(user)
        setIsLoggedIn(true)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                // userId: user.id,
                token: token,
            })
        )
    }, [])

    const fetchUserData = useCallback(async (token) => {
        try {
            console.log('tioke: ', token)
            const response = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/user_data`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('resspons: ', response)
            setUser(response) // Set the user data in the component state
        } catch (error) {
            // Handle errors if needed
            console.log(error)
        }
    }, [])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))

        if (storedData) {
            const loadData = async () => {
                await fetchUserData(storedData.token)
                setToken(storedData.token)
                setIsLoggedIn(true)
            }
            loadData()
        }
    }, [])

    const accountRegistration = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/register`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                return responseData
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest]
    )

    return {
        isLoading,
        accountRegistration,
        user,
        token,
        loginHandler,
        logoutHandler,
        isLoggedIn,
    }
}

export default useAuth
