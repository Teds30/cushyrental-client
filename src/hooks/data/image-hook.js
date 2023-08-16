import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useImageManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchImages = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/images`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchImage = useCallback(
        async (fileName) => {
            let responseData
            try {
                const pic = await fetch(
                    `http://127.0.0.1:8000/api/images/${fileName}`
                )
                const imageBlob = await pic.blob()
                responseData = URL.createObjectURL(imageBlob)
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const fetchIcon = useCallback(
        async (fileName) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/attribute_icons/${fileName}`,
                    expectText: true,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const deleteIcon = useCallback(
        async (fileName) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/attribute_icons/${fileName}`,
                    method: 'DELETE',
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
        fetchImages,
        fetchImage,
        fetchIcon,
        deleteIcon,
    }
}

export default useImageManager
