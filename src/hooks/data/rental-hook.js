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
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
        fetchRentals
    }
}

export default useRental
