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
                    }/api/notifications/${id}`,
                    method: 'DELETE',
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const readUserNotification = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/notifications/`,
                    body: JSON.stringify({ id: id }),
                    method: 'PUT',
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

    return {
        isLoading,
        fetchUserNotifications,
        deleteUserNotification,
        readUserNotification,
    }
}

export default useNotificationManager
