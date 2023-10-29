import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useBookmark = () => {
    const { sendRequest, isLoading } = useHttp()

    const addToBookmark = useCallback(
        async () => {
            try {
                await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/add_bookmark`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest]
    )

    const fetchBookmark = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/bookmark/${id}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (err) {
                throw err.message
            }
        },
        [sendRequest]
    )

    return {
        isLoading,
        addToBookmark,
        fetchBookmark
    }
}

export default useBookmark