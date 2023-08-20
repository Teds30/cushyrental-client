import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useGoogleAuth = () => {
    const { sendRequest, isLoading } = useHttp()

    const googleAccountRegistration = useCallback(
        async (body) => {
            let responseData;
            try {
                    responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/auth/google/redirect`,
                    method: 'GET',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                console.log(responseData);
                return responseData;
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest]
    )

    return {
        isLoading,
        googleAccountRegistration
    }
}

export default useGoogleAuth