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

    return {
        isLoading,
        fetchLandlordsVerifications,
        fetchLandlordVerification,
    }
}

export default useVerificationManager
