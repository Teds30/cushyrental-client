import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useVerificationManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchLandlordsVerifications = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/landlord_verifications`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchLandlordVerification = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/landlord_verifications/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const fetchIdentificationCards = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/identification_cards`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const accountVerification = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/account_verifications`,
                    method: 'POST',
                    body: JSON.stringify(body),
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    return {
        isLoading,
        fetchLandlordsVerifications,
        fetchLandlordVerification,
        fetchIdentificationCards,
        accountVerification,
    }
}

export default useVerificationManager
