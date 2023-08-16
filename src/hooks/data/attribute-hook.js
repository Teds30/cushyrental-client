import { useCallback, useContext, useState } from 'react'
import useHttp from '../http-hook'

const useAttributeManager = () => {
    const { sendRequest, isLoading } = useHttp()

    const fetchAmenities = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/amenities`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchAmenity = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/amenities/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const createAmenity = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/amenities/`,
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

    const updateAmenity = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/amenities/${id}`,
                    method: 'PUT',
                    body: JSON.stringify(body),
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

    const deleteAmenity = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/amenities/${id}`,
                    method: 'DELETE',
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

    /*
    @
    @
    @
    */

    const fetchFacilities = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/facilities`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchFacility = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/facilities/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const createFacility = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/facilities/`,
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

    const updateFacility = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/facilities/${id}`,
                    method: 'PUT',
                    body: JSON.stringify(body),
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

    const deleteFacility = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/facilities/${id}`,
                    method: 'DELETE',
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

    /*
    @
    @
    @
    */

    const fetchInclusions = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/inclusions`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchInclusion = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/inclusions/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const createInclusion = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/inclusions/`,
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

    const updateInclusion = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/inclusions/${id}`,
                    method: 'PUT',
                    body: JSON.stringify(body),
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

    const deleteInclusion = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/inclusions/${id}`,
                    method: 'DELETE',
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

    /*
    @
    @
    @
    */

    const fetchRules = useCallback(async () => {
        let responseData
        try {
            responseData = await sendRequest({
                url: `http://127.0.0.1:8000/api/rules`,
            })
        } catch (err) {
            throw err.message
        }

        return responseData
    }, [sendRequest])

    const fetchRule = useCallback(
        async (id) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/rules/${id}`,
                })
            } catch (err) {
                throw err.message
            }

            return responseData
        },
        [sendRequest]
    )

    const createRule = useCallback(
        async (body) => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `http://127.0.0.1:8000/api/rules/`,
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

    const updateRule = useCallback(
        async (id, body) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/rules/${id}`,
                    method: 'PUT',
                    body: JSON.stringify(body),
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

    const deleteRule = useCallback(
        async (id) => {
            try {
                await sendRequest({
                    url: `http://127.0.0.1:8000/api/rules/${id}`,
                    method: 'DELETE',
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
        fetchAmenity,
        fetchAmenities,
        fetchFacility,
        fetchFacilities,
        fetchInclusion,
        fetchInclusions,
        fetchRules,
        fetchRule,
        createAmenity,
        createFacility,
        createInclusion,
        createRule,
        updateAmenity,
        updateFacility,
        updateInclusion,
        updateRule,
        deleteAmenity,
        deleteFacility,
        deleteInclusion,
        deleteRule,
    }
}

export default useAttributeManager
