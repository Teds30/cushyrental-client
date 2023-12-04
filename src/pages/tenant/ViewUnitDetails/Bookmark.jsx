import { useEffect, useContext, useState } from 'react'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

import AuthContext from '../../../context/auth-context'
import useBookmark from '../../../hooks/data/bookmark-hook'

export default function Bookmark(props) {
    const { adjustSize = 'false', unitId } = props

    const { fetchBookmark, addToBookmark, isLoading } = useBookmark()
    const userCtx = useContext(AuthContext)

    const [isBookmark, setIsBookmark] = useState()

    const bookmarkHandler = async () => {
        // setIsBookmark((prevIsBookmark) => !prevIsBookmark);

        const data = { user_id: userCtx.user.id, unit_id: unitId }
        const res = await addToBookmark(data)

        setIsBookmark(res.unit_id === unitId ? true : false)
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchBookmark(userCtx.user.id)
                const isUnitBookmarked = res.filter(
                    (bookmark) => bookmark.unit_id === unitId
                )
                setIsBookmark(isUnitBookmarked.length !== 0 ? true : false)
            } catch (err) {}
        }
        if (!isBookmark) {
            handleFetch()
        }
    }, [userCtx])

    return (
        isBookmark && (
            <div>
                <Checkbox
                    checked={isBookmark}
                    icon={<BookmarkBorderIcon sx={{ fill: 'var(--accent)' }} />}
                    checkedIcon={
                        <BookmarkIcon sx={{ fill: 'var(--accent)' }} />
                    }
                    onClick={bookmarkHandler}
                />
            </div>
        )
    )
}
