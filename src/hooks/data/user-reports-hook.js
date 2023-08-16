import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useUserReports = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchUsersReports = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/user_reports`,
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
                    url: `http://127.0.0.1:8000/api/user_reports/${id}`,
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
