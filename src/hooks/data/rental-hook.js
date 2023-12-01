import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useRental = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchRentals = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/landlord-rentals/${id}`,
                    method: 'GET',
                })

                return responseData
            } catch (err) {
                throw err.message
            }
            return responseData
        },
        [sendRequest]
    )

    const terminateUser = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/terminate-rentals/${id}`,
                    method: 'POST',
                })

                return responseData
            } catch (err) {
                throw err.message
            }
            return responseData
        },
        [sendRequest]
    )

    return {
        isLoading,
        fetchRentals,
        terminateUser,
    }
}

export default useRental
