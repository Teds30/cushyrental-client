import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useUserManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchUsers = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/users`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchUser = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/users/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const fetchUserUnits = useCallback(
        async (user_id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/user_units/${user_id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const updateUserAmenities = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/unit_amenities`,
                    method: 'POST',
                    body: JSON.stringify(body),
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

    const updateUserInclusions = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/unit_inclusions`,
                    method: 'POST',
                    body: JSON.stringify(body),
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

    const updateUserRules = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/unit_rules`,
                    method: 'POST',
                    body: JSON.stringify(body),
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

    const updateUserFacilities = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/unit_facilities`,
                    method: 'POST',
                    body: JSON.stringify(body),
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
        fetchUser,
        fetchUsers,
        fetchUserUnits,
        updateUserAmenities,
        updateUserRules,
        updateUserInclusions,
        updateUserFacilities
    }
}

export default useUserManager
