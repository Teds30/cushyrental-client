import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import { FiChevronLeft } from 'react-icons/fi'

import styles from './Notifications.module.css'

import SwipeableNotification from './SwipeableNotification'

import useNotificationManager from '../../hooks/data/notification-hook'
import AuthContext from '../../context/auth-context'

const Notifications = () => {
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([])
    const authCtx = useContext(AuthContext)
    const {
        isLoading,
        fetchUserNotifications,
        readUserNotification,
        deleteUserNotification,
    } = useNotificationManager()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchUserNotifications(authCtx.user.id)
            console.log(res)
            setNotifications(res)
        }

        if (authCtx.user) fetchData()
    }, [authCtx])

    const handleArchive = () => {
        // Implement your archive logic here.
        console.log('Archived')
    }

    const handleDelete = async (id) => {
        // Implement your delete logic here.
        console.log('Deleted: ', id)
        const res = await deleteUserNotification(id)
    }

    const handleClick = async ({ url = '', id = null }) => {
        // Implement your delete logic here.
        console.log('Clicked: ', url)
        const res = await readUserNotification(id)
        navigate(url)
    }

    return (
        <div className={styles['container']}>
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
                            to="/"
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }}
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
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                textAlign: 'center',
                                marginLeft: '-24px',
                            }}
                        >
                            <p className="title">Notifications</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={styles['notifications-container']}>
                {notifications.length > 0 ? (
                    <>
                        <h3>Recents</h3>
                        {notifications.map((notification, index) => (
                            <SwipeableNotification
                                key={index}
                                data={notification}
                                is_read={true}
                                onArchive={handleArchive}
                                onDelete={() => {
                                    handleDelete(notification.id)
                                }}
                                onVisit={handleClick}
                            />
                        ))}
                    </>
                ) : (
                    <p style={{ textAlign: 'center' }}>No notifications. </p>
                )}
            </div>
        </div>
    )
}

export default Notifications
