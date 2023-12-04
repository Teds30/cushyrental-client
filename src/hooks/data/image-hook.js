import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

import AuthContext from '../../context/auth-context'

const useImageManager = () => {
    const { sendRequest, isLoading } = useHttp()
    const authCtx = useContext(AuthContext)

    const uploadImage = useCallback(
        async ({ file = null, name = '', path = 'images' }) => {
            let responseData
            const formData = new FormData()

            formData.append('image', file)
            formData.append('name', name)
            formData.append('path', path)
            try {
                let res = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/image-upload`,
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Authorization: `Bearer ${authCtx.token}`,
                        },
                    }
                )
                responseData = await res.json()
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const fetchImages = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/images`,
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
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/images/${fileName}`
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

    const fetchAvatar = useCallback(
        async (image_path) => {
            let responseData
            try {
                let pic
                if (image_path.includes('https')) {
                    pic = await fetch(image_path)
                } else {
                    pic = await fetch(
                        `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/avatar`,
                        {
                            method: 'POST',
                            body: JSON.stringify({ image_path: image_path }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                }
                const imageBlob = await pic.blob()
                responseData = URL.createObjectURL(imageBlob)
            } catch (err) {
                console.log('error: ', err.message)
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
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/attribute_icons/${fileName}`,
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
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/attribute_icons/${fileName}`,
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
        uploadImage,
        isLoading,
        fetchImages,
        fetchImage,
        fetchAvatar,
        fetchIcon,
        deleteIcon,
    }
}

export default useImageManager
