import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useSchoolManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchSchools = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/schools`,
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
        fetchSchools,
    }
}

export default useSchoolManager
