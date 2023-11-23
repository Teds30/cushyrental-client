import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useUnitManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchUnits = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/units`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchUnit = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/units/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const updateUnit = useCallback(
        async (id, body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/units/${id}`,
                    method: 'PUT',
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

    const fetchUnitAmenities = useCallback(
        async (id, body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_amenities/${id}`,
                    method: 'GET',
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

    const fetchUnitFacilities = useCallback(
        async (id, body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_facilities/${id}`,
                    method: 'GET',
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

    const fetchUnitInclusions = useCallback(
        async (id, body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_inclusions/${id}`,
                    method: 'GET',
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

    const fetchUnitRules = useCallback(
        async (id, body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_rules/${id}`,
                    method: 'GET',
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

    const createUnit = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/units`,
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
        },
        [sendRequest]
    )

    const searchUnits = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/search`,
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


    const deleteUnitAmenity = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_amenities`,
                    method: 'DELETE',
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

    const editUnitAmenity = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_amenities`,
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

    const deleteUnitInclusion = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_inclusions`,
                    method: 'DELETE',
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

    const editUnitInclusion = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_inclusions`,
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

    const deleteUnitRule = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_rules`,
                    method: 'DELETE',
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

    const editUnitRule = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_rules`,
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

    const editUnitfacility = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/unit_facilities`,
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

    const deleteUnit = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/units/${id}`,
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
        fetchUnits,
        fetchUnit,
        fetchUnitAmenities,
        fetchUnitFacilities,
        fetchUnitInclusions,
        fetchUnitRules,
        updateUnit,
        createUnit,
        searchUnits,
        deleteUnitAmenity,
        editUnitAmenity,
        deleteUnitInclusion,
        editUnitInclusion,
        deleteUnitRule,
        editUnitRule,
        editUnitfacility,
        deleteUnit
    }
}

export default useUnitManager
