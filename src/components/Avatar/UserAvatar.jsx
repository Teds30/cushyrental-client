import React, { useEffect, useState } from 'react'
import useImageManager from '../../hooks/data/image-hook'

import styles from './UserAvatar.module.css'
import { Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const UserAvatar = (props) => {
    const { avatar_url = '', size = '32px' } = props

    const { fetchAvatar, isLoading } = useImageManager()

    const { data: userAvatar, isLoading: userAvatarLoading } = useQuery({
        queryKey: ['avatar_url', avatar_url],
        queryFn: () => {
            return fetchAvatar(avatar_url)
        },
        refetchOnWindowFocus: false,
        enabled: !!avatar_url,
    })

    return userAvatar ? (
        <div
            className={styles['image-container']}
            style={{ width: size, height: size, minWidth: size }}
        >
            <img src={userAvatar} alt="" />
        </div>
    ) : (
        <Skeleton variant="circular" width={size} height={size} />
    )
}

export default UserAvatar
