import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useAuth = () => {
    const { sendRequest, isLoading } = useHttp()

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
    }
}

export default useAuth
