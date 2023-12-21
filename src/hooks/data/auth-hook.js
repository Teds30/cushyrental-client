import { useCallback, useEffect, useState } from 'react'
import useHttp from '../http-hook'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
    const { sendRequest, isLoading } = useHttp()

    const [user, setUser] = useState()
    const [token, setToken] = useState('407|X0CI5S3QjzEDCFQFZuNxFZtR4m6xaJWdBJAPd9jo712d67f3')
    const [isLoggedIn, setIsLoggedIn] = useState('initial')
    const navigate = useNavigate()
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
        navigate('/')
    }, [])

    const fetchUserData = useCallback(async (token) => {
        const storedData = JSON.parse(localStorage.getItem('userData'))

        try {
            // console.log('tioke: ', token)
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/user_data`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )

            const data = await response.json()

            const { user } = data
            if (response) {
                setUser(user)
                setToken(storedData.token)
                setIsLoggedIn(true)
            }
            if (!response.ok) {
                localStorage.removeItem('userData')
                setUser(null)
                setIsLoggedIn(false)
                navigate('/signin')
            }
            // navigate('/')
        } catch (error) {
            // Handle errors if needed
            console.log('error: ', error)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(
            'userData',
            JSON.stringify({
                // userId: user.id,
                token: token,
            })
        )
        const storedData = JSON.parse(localStorage.getItem('userData'))

        if (storedData) {
            const loadData = async () => {
                await fetchUserData(storedData.token)
            }
            loadData()
        } else {
            setIsLoggedIn(false)
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
