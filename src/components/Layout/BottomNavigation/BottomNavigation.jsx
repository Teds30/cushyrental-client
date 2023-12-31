import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
import Badge from '@mui/material/Badge'

import { IoIosCalendar } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'
import { BiBuildingHouse } from 'react-icons/bi'

import AuthContext from '../../../context/auth-context'
import useHttp from '../../../hooks/http-hook'
import useNotificationManager from '../../../hooks/data/notification-hook'

import PrimaryButton from '../../Button/PrimaryButton'

import styles from './BottomNavigation.module.css'

import nav_data from '../nav_data'
import Tour from 'reactour'

function HideOnScroll(props) {
    const { children } = props

    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="up" in={!trigger}>
            {children}
        </Slide>
    )
}

const CustomBadge = styled(Badge)({
    color: '#fff',
    '& span': {
        backgroundColor: 'red',
    },
})

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

const steps = [
    {
        selector: '#chats',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Chats</p>
                <p>
                    View your conversations with other users. On this page, you
                    can accept or reject incoming rental requests from tenants,
                    allowing you to manage and respond to inquiries efficiently.
                </p>
            </div>
        ),
    },
    {
        selector: '#manage_unit',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">My Units</p>
                <p>
                    Use this page to manage your units. Create or edit unit
                    listings easily.
                </p>
            </div>
        ),
    },
    {
        selector: '#notifications',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Notifications</p>
                <p>
                    Get reminders for your tenants' upcoming payment dates and
                    receive notification when a tenant is renting a unit.
                </p>
            </div>
        ),
    },
    {
        selector: '#profile',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Profile</p>
                <p>
                    Make changes to your profile, handle unit subscriptions, or
                    use the interactive calendar to view rental due dates.
                </p>
            </div>
        ),
    },
]

const unitSteps = [
    {
        selector: '#manage_unit',
        content: (
            <div className={styles['tourcontainer']}>
                {/* <p className="title">Manage Unit</p> */}
                <p>Unit listings can be found in the 'My Units' page</p>
            </div>
        ),
    },
]

const BottomNavigation = (props) => {
    const {
        current = 0,
        children,
        isTenant = false,
        openNextTour = false,
        isUnitTourOpen: isUnitTourOpenProps,
        setUnitOpen,
    } = props

    const [isTourOpen, setIsTourOpen] = useState(openNextTour)
    const [isUnitTourOpen, setIsUnitTourOpen] = useState(false)

    useEffect(() => {
        const reloadPage = () => {
            if (openNextTour) setIsTourOpen(true)
        }
        reloadPage()
    }, [openNextTour])

    useEffect(() => {
        const reloadPage = () => {
            if (isUnitTourOpenProps) setIsUnitTourOpen(true)
        }
        reloadPage()
    }, [isUnitTourOpenProps])

    const authCtx = useContext(AuthContext)
    const { fetchUserNotifications, isLoading: notificationLoading } =
        useNotificationManager()

    const [selected, setSelected] = useState(current)
    const [navData, setNavData] = useState(nav_data)
    const [user, setUser] = useState()
    const [socket, setSocket] = useState(null)
    const [notifCtr, setNotifCtr] = useState(0)
    const navigate = useNavigate()

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
    }, [])

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
            // console.log('i joined notif!')
        })

        const mainNav = !isTenant
            ? {
                  name: 'My Units',
                  icon: <BiBuildingHouse size={32} style={{ fill: '#fff' }} />,
                  main: true,
                  redirect_url: '/manage_unit',
                  element_id: 'manage_unit',
              }
            : {
                  name: 'Search',
                  icon: (
                      <FiSearch
                          size={32}
                          style={{ color: '#fff', fill: 'transparent' }}
                      />
                  ),
                  main: true,
                  redirect_url: '/search',
                  element_id: 'search',
              }

        setNavData([...nav_data.slice(0, 2), mainNav, ...nav_data.slice(2)])
    }, [socket, authCtx.user, notifCtr])

    return (
        !notificationLoading && (
            <React.Fragment>
                <Tour
                    steps={steps}
                    isOpen={isTourOpen}
                    onRequestClose={() => setIsTourOpen(false)}
                    accentColor="var(--accent)"
                    badgeContent={(curr, tot) => `${curr}/${tot}`}
                    showNumber={true}
                    showNavigation={false}
                    showNavigationNumber={true}
                    disableInteraction={true}
                    disableKeyboardNavigation={true}
                    rounded={10}
                    lastStepNextButton={
                        <PrimaryButton
                            onClick={() => {
                                document.body.scrollTop = 0 // For Safari
                                document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE, and Opera
                                setUnitOpen(true)
                            }}
                        >
                            Done
                        </PrimaryButton>
                    }
                />
                <Tour
                    steps={unitSteps}
                    isOpen={isUnitTourOpen}
                    onRequestClose={() => setIsTourOpen(false)}
                    accentColor="var(--accent)"
                    badgeContent={(curr, tot) => `${curr}/${tot}`}
                    showNumber={false}
                    showNavigation={false}
                    showNavigationNumber={false}
                    showButtons={false}
                    rounded={10}
                />
                {/* <CssBaseline /> */}
                {
                    // <HideOnScroll {...props}>
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
                                            id={data.element_id}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                selectHandler(index)

                                                if (data.name === 'My Units') {
                                                    navigate(
                                                        data.redirect_url,
                                                        {
                                                            state: {
                                                                isTourOpen:
                                                                    isUnitTourOpen,
                                                            },
                                                        }
                                                    )
                                                } else {
                                                    navigate(data.redirect_url)
                                                }
                                            }}
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
                                        id={data.element_id}
                                    >
                                        <Link
                                            // to={data.redirect_url}
                                            className={styles['nav_link']}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                selectHandler(index)
                                                navigate(data.redirect_url)
                                            }}
                                        >
                                            {data.name === 'Notification' && (
                                                <CustomBadge
                                                    badgeContent={notifCtr}
                                                >
                                                    {index === selected
                                                        ? data.selectedIcon
                                                        : data.icon}
                                                </CustomBadge>
                                            )}
                                            {data.name !== 'Notification' && (
                                                <>
                                                    {index === selected
                                                        ? data.selectedIcon
                                                        : data.icon}
                                                </>
                                            )}
                                            {data.name}

                                            {/* {data.name === 'Notification' &&
                                                notifCtr > 0 && (
                                                    <span
                                                        className={
                                                            styles['badge']
                                                        }
                                                    >
                                                        {notifCtr}
                                                    </span>
                                                )} */}
                                        </Link>
                                    </Box>
                                )
                            })}
                        </Toolbar>
                    </AppBar>
                    // </HideOnScroll>
                }
                <Toolbar />
                <Container>{children}</Container>
            </React.Fragment>
        )
    )
}

export default BottomNavigation
