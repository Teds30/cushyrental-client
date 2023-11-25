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

    const fetchSchoolIcon = useCallback(
        async (file_name) => {
            let responseData
            try {
                responseData = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/school_icons/${file_name}`
                )

                const imageBlob = await responseData.blob()
                responseData = URL.createObjectURL(imageBlob)
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
        fetchSchoolIcon,
    }
}

export default useSchoolManager
