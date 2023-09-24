import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useUserReports = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchUsersReports = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/user_reports`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchUserReports = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/user_reports/${id}`,
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
        fetchUsersReports,
        fetchUserReports,
    }
}

export default useUserReports
