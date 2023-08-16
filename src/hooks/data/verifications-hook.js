import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useVerificationManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchLandlordsVerifications = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/landlord_verifications`,
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
                    url: `http://127.0.0.1:8000/api/landlord_verifications/${id}`,
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
    }
}

export default useVerificationManager
