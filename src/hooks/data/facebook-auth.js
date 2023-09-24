import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useFacebookAuth = () => {
    const { sendRequest, isLoading } = useHttp()

    const facebookAccountRegistration = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/facebook/auth`,
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
        facebookAccountRegistration,
    }
}

export default useFacebookAuth
