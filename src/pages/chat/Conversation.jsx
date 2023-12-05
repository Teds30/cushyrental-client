import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import {
    TbChevronLeft,
    TbDotsVertical,
    TbFlag,
    TbFlagFilled,
} from 'react-icons/tb'

import styles from './Conversation.module.css'
import AvailModal from './AvailModal'
import Messages from './Messages'
import MessageBox from './MessageBox'

import useHttp from '../../hooks/http-hook'
import AuthContext from '../../context/auth-context'
import { Menu, MenuItem } from '@mui/material'
import SwipeableCard from '../../components/SwipeableCard/SwipeableCard'
import ReportUser from './ReportUser'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const Conversation = (props) => {
    const authCtx = useContext(AuthContext)
    // Get QueryClient from the context
    const queryClient = useQueryClient()

    const [user_id, setUserId] = useState()

    useEffect(() => {
        const loadData = () => {
            if (authCtx.user) setUserId(authCtx.user.id)
        }

        loadData()
    }, [authCtx.user])

    const { room_id } = useParams()
    const navigate = useNavigate()

    const { sendRequest, isLoading } = useHttp()

    const [socket, setSocket] = useState(null)
    const [room, setRoom] = useState()
    const [unit, setUnit] = useState()
    const [chats, setChats] = useState([])
    const [chatsReady, setChatReady] = useState(false)
    const [typing, setTyping] = useState(false)
    const container = useRef()

    const [cardOpen, setCardOpen] = useState()
    const [cardTitle, setCardTitle] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const toggleDrawer = (newOpen) => {
        setCardOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setCardOpen(false)
    }

    useEffect(() => {
        setSocket(
            io(import.meta.env.VITE_CHAT_LOCALHOST, {
                transports: ['websocket'],
            })
        )
    }, [])

    const {
        data: convoData,
        isLoading: convoLoading,
        refetch: convoDataRefetch,
    } = useQuery({
        queryKey: ['convo', room_id],
        queryFn: () => {
            const res = sendRequest({
                url: `${
                    import.meta.env.VITE_CHAT_LOCALHOST
                }/chats/${room_id}/token=${authCtx.token}`,
            })
            return res
        },
        refetchOnWindowFocus: false,
        enabled: !!room_id && !!authCtx.token,
    })

    const { data: convoRoomData, isLoading: convoRoomLoading } = useQuery({
        queryKey: ['convoRoom', room_id],
        queryFn: async () => {
            console.log('sdasd')
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_CHAT_LOCALHOST
                }/rooms/${room_id}/token=${authCtx.token}`,
            })

            if (res) {
                const landlord = await fetchUserDetails(res.landlord_id)
                const tenant = await fetchUserDetails(res.tenant_id)
                // conole.log('asd: ', {
                //     ...res,
                //     landlord: landlord,
                //     tenant: tenant,
                // })
                return { ...res, landlord: landlord, tenant: tenant }
            }

            return res
        },
        refetchOnWindowFocus: false,
        enabled: !!room_id && !!authCtx.token,
    })

    useEffect(() => {
        if (authCtx.user) {
            setRoom(convoRoomData)
        }
    }, [authCtx.user, convoRoomData])

    const { data: convoUnitData, isLoading: convoUnitLoading } = useQuery({
        queryKey: ['convoUnit', room?.unit_id],
        queryFn: async () => {
            let res = null
            if (room) {
                res = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/units/${
                        convoRoomData.unit_id
                    }`,
                })
            }
            return res
        },
        refetchOnWindowFocus: false,
        enabled: !!convoRoomData,
    })

    useEffect(() => {
        if (convoData) {
            setChatReady(true)
            setChats(convoData)
        }
    }, [convoData])

    const readChat = async (room_id, user_id) => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_CHAT_LOCALHOST}/read-chats/${room_id}`,
            method: 'PATCH',
            body: JSON.stringify({
                user_id: user_id,
            }),
        })
    }

    useEffect(() => {
        if (convoUnitData) {
            setUnit(convoUnitData)
        }
    }, [convoUnitData])

    const fetchUserDetails = async (userId) => {
        const res = await sendRequest({
            url: `${
                import.meta.env.VITE_BACKEND_LOCALHOST
            }/api/users/${userId}`,
        })
        return res
    }

    useEffect(() => {
        if (room) {
            if (
                room.landlord_id !== authCtx.user.id &&
                room.tenant_id !== authCtx.user.id
            ) {
                navigate('/')
                return
            }

            // console.log(room.unit_id)

            // fetchUnit(room.unit_id)
            readChat(room._id, authCtx.user.id)
        }
    }, [room])

    useEffect(() => {
        if (!socket || !room) return

        if (
            room.landlord_id !== authCtx.user.id &&
            room.tenant_id !== authCtx.user.id
        )
            return

        socket.emit('room-join', { room_id: room_id })
        socket.on('room-joined', () => {
            // convoDataRefetch()
            readChat(room_id, authCtx.user.id)
        })
        socket.on('message-sent', ({ message }) => {
            setChats((prev) => [...prev, { ...message, read: true }])
            socket.emit('receiver-seen-signal', { room_id: room_id })
            queryClient.invalidateQueries({ queryKey: ['convo', room_id] })
            queryClient.setQueryData(
                ['convo', { id: room_id }],
                [...convoData, { ...message, read: true }]
            )
        })

        socket.on('typing-started', () => setTyping(true))
        socket.on('typing-stopped', () => setTyping(false))

        socket.on('receiver-seen', () => {
            convoDataRefetch()
        })
    }, [socket, room])

    const handleSend = (message) => {
        if (!message) return
        socket.emit('send-message', {
            message,
            sender_id: user_id,
            room_id: room_id,
            createdAt: new Date().toISOString(),
        })
        setChats((prev) => [
            ...prev,
            {
                message,
                sender_id: user_id,
                room_id: room_id,
                createdAt: new Date().toISOString(),
            },
        ])
    }

    useEffect(() => {
        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight
        }
    })

    let recipient
    if (room && user_id === room.landlord_id) {
        recipient = `${room.tenant.first_name} ${room.tenant.last_name}`
    } else if (room && user_id === room.tenant_id) {
        recipient = `${room.landlord.first_name} ${room.landlord.last_name}`
    }

    return (
        <div className={styles['container']}>
            <Box sx={{ position: 'fixed', top: 0, width: '100%' }}>
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
                    <Toolbar>
                        <Link
                            to="/chats"
                            onClick={() => {
                                socket.emit('room-leave', { room_id: room_id })
                                console.log('left')
                            }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <TbChevronLeft
                                    style={{
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box sx={{ flexGrow: 1 }}>
                            <p className="title">
                                {convoUnitData && convoUnitData.name}
                            </p>
                            <p>{room && recipient}</p>
                        </Box>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            onClick={handleClick}
                        >
                            <TbDotsVertical
                                style={{
                                    color: 'var(--fc-strong)',
                                    fill: 'var(--fc-strong)',
                                }}
                            />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    // handleDateType(id, 0)
                                    handleClose()
                                    toggleDrawer(true)
                                }}
                            >
                                <Box
                                    sx={{
                                        background: 'var(--bg-layer3)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '14px',
                                        height: '14px',
                                        padding: '8px',
                                        marginRight: '8px',
                                    }}
                                >
                                    <TbFlagFilled size={'14px'} />
                                </Box>
                                <span>Report user</span>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {socket && room && (
                    <AvailModal
                        unit={convoUnitData}
                        user_id={user_id}
                        socket={socket}
                        room={room}
                        room_id={room_id}
                    />
                )}
            </Box>

            <SwipeableCard
                open={cardOpen}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
                title={`Report`}
            >
                {room && (
                    <ReportUser
                        handleCloseDrawer={handleCloseDrawer}
                        reportedBy={user_id}
                        reportingUser={
                            room && user_id === room.tenant_id
                                ? room.landlord_id
                                : room.tenant_id
                        }
                    />
                )}
            </SwipeableCard>

            <Messages
                isLoading={isLoading}
                handleSend={handleSend}
                chatsReady={chatsReady}
                chats={chats}
                containerRef={container}
                typing={typing}
                setTyping={setTyping}
                user_id={user_id}
                room_id={room_id}
                room={room}
            />

            <MessageBox
                setChats={setChats}
                handleSend={handleSend}
                socket={socket}
                room_id={room_id}
                user_id={user_id}
            />
        </div>
    )
}

export default Conversation
