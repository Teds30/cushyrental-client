import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useNotificationManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchUserNotifications = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/user_notifications/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const deleteUserNotification = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/user_notifications/${id}`,
                    method: 'DELETE',
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
        fetchUserNotifications,
        deleteUserNotification,
    }
}

export default useNotificationManager
