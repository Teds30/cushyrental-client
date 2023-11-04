import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useBookmark = () => {
    const { sendRequest, isLoading } = useHttp()

    const addToBookmark = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/add_bookmark`,
                    method: 'POST',
                    body: JSON.stringify(body),
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

    const fetchBookmark = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/bookmark/${id}`,
                    method: 'GET',
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

    const fetchBookmarkUnits = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/bookmark_units/${id}`,
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
        addToBookmark,
        fetchBookmark,
        fetchBookmarkUnits,
    }
}

export default useBookmark