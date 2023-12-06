import { useEffect, useContext, useState } from 'react'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import AuthContext from '../../../context/auth-context'
import useBookmark from '../../../hooks/data/bookmark-hook'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

export default function LandlordProfileBookmark(props) {
    const { adjustSize = false, unitId } = props

    const userCtx = useContext(AuthContext)

    // Access the client
    const queryClient = useQueryClient()

    const { fetchBookmark, addToBookmark } = useBookmark()

    const [loadingUnit, setLoadingUnit] = useState()

    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        data: bookmarks,
        isLoading: bookmarkLoading,
        refetch: bookmarksRefetch,
    } = useQuery({
        queryKey: ['is_bookmarked', unitId],
        queryFn: async () => {
            // console.log('refreshhh')
            const res = await fetchBookmark(userCtx.user.id)
            return res
        },
        refetchOnWindowFocus: false,
        enabled: !!userCtx.user.id && !!unitId,
    })

    const mutation = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
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

    const handleBookmarkClick = async (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    useEffect(() => {
        const isUnitBookmarked = bookmarks?.filter(
            (bookmark) => bookmark.unit_id === unitId
        )

        setIsBookmarked(isUnitBookmarked?.length !== 0)
        setIsLoading(false)
    }, [bookmarks])

    return (
        isBookmarked !== undefined && (
            <div>
                <Checkbox
                    checked={isBookmarked}
                    icon={
                        isLoading ? (
                            <CircularProgress
                                size={18}
                                sx={{
                                    color: 'var(--accent)',
                                }}
                            />
                        ) : (
                            <BsBookmark
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    color: 'var(--fc-strong)',
                                    fill: 'var(--fc-body)',
                                }}
                            />
                        )
                    }
                    checkedIcon={
                        isLoading ? (
                            <CircularProgress
                                size={18}
                                sx={{
                                    color: 'var(--accent)',
                                }}
                            />
                        ) : (
                            <BsBookmarkFill
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    color: 'var(--fc-strong)',
                                    fill: 'var(--accent)',
                                }}
                            />
                        )
                    }
                    onClick={handleBookmarkClick}
                />
            </div>
        )
    )
}
