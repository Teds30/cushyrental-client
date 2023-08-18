import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useAuth = () => {
    const { sendRequest, isLoading } = useHttp()

    const accountRegistration = useCallback(
        async (body) => {
            try {
                    await sendRequest({
                    url: `http://127.0.0.1:8000/api/register`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest]
    )

    return {
        isLoading,
        accountRegistration
    }
}

export default useAuth
