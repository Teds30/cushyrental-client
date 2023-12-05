import { useEffect, useContext, useState } from 'react'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import AuthContext from '../../../context/auth-context'
import useBookmark from '../../../hooks/data/bookmark-hook'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function LandlordProfileBookmark(props) {
    const { adjustSize = false, unitId } = props

    const userCtx = useContext(AuthContext)

    // Access the client
    const queryClient = useQueryClient()

    const { fetchBookmark, addToBookmark, isLoading } = useBookmark()

    const [isBookmarked, setIsBookmarked] = useState(false)

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
    }, [bookmarks])

    return (
        isBookmarked !== undefined && (
            <div>
                <Checkbox
                    checked={isBookmarked}
                    icon={
                        <BsBookmark
                            style={{
                                width: '18px',
                                height: '18px',
                                color: 'var(--fc-strong)',
                                fill: 'var(--fc-body)',
                            }}
                        />
                    }
                    checkedIcon={
                        <BsBookmarkFill
                            style={{
                                width: '18px',
                                height: '18px',
                                color: 'var(--fc-strong)',
                                fill: 'var(--accent)',
                            }}
                        />
                    }
                    onClick={handleBookmarkClick}
                />
            </div>
        )
    )
}
