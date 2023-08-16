import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useSubscriptionManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchSubscriptions = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/subscriptions`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchSubscription = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/subscriptions/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const updateSubscription = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/subscriptions/${id}`,
                    method: 'PUT',
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
        fetchSubscription,
        fetchSubscriptions,
        updateSubscription,
    }
}

export default useSubscriptionManager
