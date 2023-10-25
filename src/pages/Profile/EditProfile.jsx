import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import styles from './EditProfile.module.css'
import { FiChevronLeft } from 'react-icons/fi'
import EditProfileDesign from './EditProfileDesign'
import EditProfileForm from './EditProfileForm'
import AuthContext from '../../context/auth-context'
import useImageManager from '../../hooks/data/image-hook'

import photo from '../../assets/Units/pics.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { useContext, useState } from 'react'

const EditProfile = () => {
    const userCtx = useContext(AuthContext)
    const { fetchAvatar, isLoading } = useImageManager()

    const [user, setUser] = useState({})

    useEffect(() => {
        const handleFetch = async () => {
            try {
                // const res = await fetchAvatar('/default/1.png')
                const res = await fetchAvatar(userCtx.user.profile_picture_img)
                setUser({ ...userCtx.user, profile_picture_img: res })
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return (
        <div className={`${styles['edit-profile-container']}`}>
            <EditProfileDesign className={`${styles['edit-profile-design']}`} />
            <Box className={`${styles['top-back-container']} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: '#fff',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                        borderBottom: '1px solid var(--border-color)',
                    }}
                >
                    <Toolbar className={`${styles['toolbar-container']}`}>
                        <Link
                            to={`/profile`}
                            className={`${styles['link-button']}`}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: 'var(--bg-layer1)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box className={`${styles['edit-feature-title']}`}>
                            <p
                                className="title"
                                style={{ color: 'var(--bg-layer1)' }}
                            >
                                PROFILE
                            </p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {!isLoading && Object.keys(user).length !== 0 && (
                <EditProfileForm userData={user} />
            )}
        </div>
    )
}

export default EditProfile
