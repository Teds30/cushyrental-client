import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useGoogleAuth = () => {
    const { sendRequest, isLoading } = useHttp()

    const googleAuth = useCallback(
        async (data) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
                    headers: {
                        Authorization: `Bearer ${data.access_token}`,
                    },
                })
                return responseData
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest]
    )

    const googleAccountRegistration = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/google/auth`,
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

    const googleAccountLogin = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/google/login`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
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
        googleAuth,
        googleAccountRegistration,
        googleAccountLogin,
    }
}

export default useGoogleAuth
