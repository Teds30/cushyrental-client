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
                    }/api/school_icons/${file_name}`,
                    {
                        Accept: 'application/json',
                    }
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
