import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useSubscriptionManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchSubscriptions = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/subscriptions`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchUserSubscriptions = useCallback(
        async (landlord_id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/user_subscriptions/${landlord_id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const fetchSubscription = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/subscriptions/${id}`,
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
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/subscriptions/${id}`,
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

    const subscribeUnit = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_subscriptions/`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                throw err.message
            }
            return responseData
        },
        [sendRequest]
    )

    const fetchGoldUnits = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/gold_units`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchSilverUnits = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/silver_units`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const deleteUnitSubscription = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_subscriptions/${id}`,
                    method: 'DELETE',
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
        fetchUserSubscriptions,
        fetchSubscriptions,
        updateSubscription,
        subscribeUnit,
        fetchSilverUnits,
        fetchGoldUnits,
        deleteUnitSubscription,
    }
}

export default useSubscriptionManager
