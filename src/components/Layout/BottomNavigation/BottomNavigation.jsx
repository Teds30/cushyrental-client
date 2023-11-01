import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide'
import { io } from 'socket.io-client'

import { styled } from '@mui/material/styles'
import Fab from '@mui/material/Fab'

import { IoIosCalendar } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'

import AuthContext from '../../../context/auth-context'
import useHttp from '../../../hooks/http-hook'
import styles from './BottomNavigation.module.css'
import useNotificationManager from '../../../hooks/data/notification-hook'

import nav_data from '../nav_data'

function HideOnScroll(props) {
    const { children } = props

    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="up" in={!trigger}>
            {children}
        </Slide>
    )
}

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',

    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'var(--accent)',
    '&:hover': {
        backgroundColor: 'var(--accent)',
    },
})

const itemStyles = {
    color: 'inherit',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // border: '1px solid red',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
}

const BottomNavigation = (props) => {
    const { current = 0, children, isTenant = false } = props

    const authCtx = useContext(AuthContext)
    const { sendRequest, isLoading } = useHttp()
    const { fetchUserNotifications } = useNotificationManager()

    const [selected, setSelected] = useState(current)
    const [navData, setNavData] = useState(nav_data)
    const [user, setUser] = useState()
    const [socket, setSocket] = useState(null)
    const [notifCtr, setNotifCtr] = useState(0)

    const selectHandler = (id) => {
        setSelected(id)
    }

    const loadData = async () => {
        if (authCtx.user) {
            setUser(authCtx.user)
            const res = await fetchUserNotifications(authCtx.user.id)

            const ctr = res.filter((notif) => notif.is_read === 0).length
            setNotifCtr(ctr)
        }
    }

    useEffect(() => {
        setSocket(
            io(import.meta.env.VITE_CHAT_LOCALHOST, {
                transports: ['websocket'],
            })
        )

        const mainNav = !isTenant
            ? {
                  name: 'Calendar',
                  icon: (
                      <Link
                          to="/calendar"
                          style={{
                              display: 'flex',
                              justifyContent: 'centers',
                              alignItems: 'center',
                          }}
                      >
                          <IoIosCalendar size={32} style={{ fill: '#fff' }} />
                      </Link>
                  ),
                  main: true,
              }
            : {
                  name: 'Search',
                  icon: (
                      <Link
                          to="/search"
                          style={{
                              display: 'flex',
                              justifyContent: 'centers',
                              alignItems: 'center',
                          }}
                      >
                          <FiSearch
                              size={32}
                              style={{ color: '#fff', fill: 'transparent' }}
                          />
                      </Link>
                  ),
                  main: true,
              }

        setNavData([...nav_data.slice(0, 2), mainNav, ...nav_data.slice(2)])
    }, [authCtx.user, notifCtr])

    useEffect(() => {
        if (!socket || !authCtx.user) return

        loadData()
        socket.emit('notification-join', { user_id: authCtx.user.id })
        socket.on('notification-update', async () => {
            const res = await fetchUserNotifications(authCtx.user.id)

            const ctr = res.filter((notif) => notif.is_read === 0).length
            setNotifCtr(ctr)
        })
        socket.on('notification-joined', () => {
            console.log('i joined!')
        })
    }, [socket])

    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            {
                <HideOnScroll {...props}>
                    <AppBar
                        position="fixed"
                        sx={{
                            background: 'var(--bg-layer1)',
                            color: 'var(--fc-body-light)',
                            top: 'auto',
                            bottom: 0,
                        }}
                    >
                        <Toolbar
                            sx={{
                                top: 'auto',
                                bottom: 0,
                                padding: 0,
                            }}
                        >
                            {navData.map((data, index) => {
                                const nav_style =
                                    index === selected
                                        ? {
                                              ...itemStyles,
                                              color: 'var(--accent)',
                                              fill: 'var(--accent)',
                                          }
                                        : {
                                              ...itemStyles,
                                              color: 'var(--fc-body-light)',
                                              fill: 'var(--fc-body-light)',
                                          }

                                return data.main === true ? (
                                    <div key={index} style={{ flex: '1' }}>
                                        <StyledFab
                                            color="secondary"
                                            aria-label="add"
                                        >
                                            {data.icon}
                                        </StyledFab>
                                        <Box sx={itemStyles}>
                                            <Box
                                                sx={{
                                                    width: '24px',
                                                    height: '24px',
                                                }}
                                            />
                                            {data.name}
                                        </Box>
                                    </div>
                                ) : (
                                    <Box
                                        sx={{
                                            ...nav_style,
                                            position: 'relative',
                                        }}
                                        key={index}
                                        onClick={() => {
                                            selectHandler(index)
                                        }}
                                    >
                                        {index === selected
                                            ? data.selectedIcon
                                            : data.icon}
                                        {data.name}

                                        {data.name === 'Notification' &&
                                            notifCtr > 0 && (
                                                <span
                                                    className={styles['badge']}
                                                >
                                                    {notifCtr}
                                                </span>
                                            )}
                                    </Box>
                                )
                            })}
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            }
            <Toolbar />
            <Container>{children}</Container>
        </React.Fragment>
    )
}

export default BottomNavigation
