import React, { useState, useEffect, useContext } from 'react'

import useBookmark from '../../../hooks/data/bookmark-hook'
import AuthContext from '../../../context/auth-context'

import styles from './ViewUnitDetails.module.css'
import IconButton from '@mui/material/IconButton'

import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

const UnitBookmark = (props) => {
    const { scrolling, unitId } = props

    // Access the client
    const queryClient = useQueryClient()

    const { fetchBookmark, addToBookmark, isLoading } = useBookmark()
    const userCtx = useContext(AuthContext)

    const [isBookmarked, setIsBookmarked] = useState([])

    const {
        data: bookmarks,
        isLoading: bookmarkLoading,
        refetch: bookmarksRefetch,
    } = useQuery({
        queryKey: ['is_bookmarked', unitId],
        queryFn: async () => {
            console.log('refreshhh')
            const res = await fetchBookmark(userCtx.user.id)
            const isUnitBookmarked = res.filter(
                (bookmark) => bookmark.unit_id === unitId
            )

            console.log(isUnitBookmarked.length !== 0)
            setIsBookmarked(isBookmarked.length !== 0)
            return isUnitBookmarked
        },
        refetchOnWindowFocus: false,
        enabled: !!userCtx.user.id && !!unitId,
    })

    const mutation = useMutation({
        mutationFn: async () => {
            console.log('fdfd')
            await addToBookmark({
                user_id: userCtx.user.id,
                unit_id: unitId,
            })
        },
        onSuccess: async (dt) => {
            queryClient.invalidateQueries(['is_bookmarked', unitId])
            bookmarksRefetch() // Refetch after mutation
        },
    })

    const handleBookmarkClick = async () => {
        await mutation.mutate()
    }

    useEffect(() => {
        console.log('current: ', isBookmarked)
    }, [isBookmarked])

    return (
        <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleBookmarkClick}
        >
            {bookmarkLoading ? (
                <CircularProgress
                    size={24}
                    sx={{ color: scrolling ? 'var(--fc-strong)' : '#fff' }}
                />
            ) : isBookmarked === true ? (
                <BsBookmarkFill
                    style={{
                        fill: 'var(--accent)',
                        background: 'transparent',
                    }}
                />
            ) : (
                <BsBookmark
                    style={{
                        fill: scrolling ? 'var(--fc-strong)' : '#fff',
                    }}
                />
            )}
        </IconButton>
    )
}

export default UnitBookmark
