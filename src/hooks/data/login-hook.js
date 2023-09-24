import { useCallback } from 'react'
import useHttp from '../http-hook'

const useLogin = () => {
    const { sendRequest, isLoading } = useHttp()

    const loginUser = useCallback(
        async (credentials) => {
            try {
                const responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/login`,
                    method: 'POST',
                    body: JSON.stringify(credentials),
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

    const forgotPassword = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/forgot_password`,
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
        loginUser,
        forgotPassword,
    }
}

export default useLogin
