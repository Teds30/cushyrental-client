import { useState, useCallback, useRef, useEffect } from 'react'

import notistack from './notistack-hook'
import useNotistack from './notistack-hook'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { notify } = useNotistack()
    //eslint-disable-next-line
    const [error, setError] = useState()

    const activeHttpRequests = useRef([])

    const storedData = JSON.parse(localStorage.getItem('userData'))

    const sendRequest = useCallback(
        async ({
            url,
            method = 'GET',
            body = null,
            noToken = false,
            headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: !noToken && `Bearer ${storedData.token}`,
            },
            expectText = false,
            notifyError = false,
        }) => {
            setIsLoading(true)
            const httpAbortCtrl = new AbortController()
            activeHttpRequests.current.push(httpAbortCtrl)
            console.log(headers)
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal,
                })

                let data
                if (expectText) {
                    data = await response.text()
                } else {
                    data = await response.json()
                }

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                )

                if (!response.ok) {
                    // throw new Error(response.message)
                    if (notifyError) {
                        notify(data.message, 'error')
                    }
                    throw new Error(data.message)
                }

                setIsLoading(false)
                return data
            } catch (err) {
                setError(err.message)
                console.log(err.message)
                setIsLoading(false)
                throw err
            }
        },
        []
    )

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
        }
    }, [])

    return {
        sendRequest,
        isLoading,
        clearError,
    }
}

export default useHttp
