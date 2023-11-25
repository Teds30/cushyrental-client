import React, { useEffect, useState } from 'react'
import useImageManager from '../../hooks/data/image-hook'

import styles from './UserAvatar.module.css'
import { Skeleton } from '@mui/material'

const UserAvatar = (props) => {
    const { avatar_url = '', size = '32px' } = props

    const { fetchAvatar, isLoading } = useImageManager()
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const image = await fetchAvatar(avatar_url)

                setAvatar(image)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return avatar ? (
        <div
            className={styles['image-container']}
            style={{ width: size, height: size, minWidth: size }}
        >
            <img src={avatar} alt="" />
        </div>
    ) : (
        <Skeleton variant="circular" width={size} height={size} />
    )
}

export default UserAvatar
