import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import { TbChevronLeft, TbDotsVertical } from 'react-icons/tb'

import styles from './Conversation.module.css'
import AvailModal from './AvailModal'
import Messages from './Messages'
import MessageBox from './MessageBox'

import useHttp from '../../hooks/http-hook'
import AuthContext from '../../context/auth-context'

const Conversation = (props) => {
    const authCtx = useContext(AuthContext)
    const user_id = authCtx.user.id

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

    useEffect(() => {
        setSocket(
            io(import.meta.env.VITE_CHAT_LOCALHOST, {
                transports: ['websocket'],
            })
        )

        const fetchUnit = async (unit_id) => {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/units/${unit_id}`,
            })
            setUnit(res)
        }

        const fetchRoomDetails = async (room_id) => {
            const res = await sendRequest({
                url: `${import.meta.env.VITE_CHAT_LOCALHOST}/rooms/${room_id}`,
            })

            fetchUnit(res.unit_id)
            setRoom(res)
        }

        fetchRoomDetails(room_id)
    }, [])

    const getChats = async (room_id) => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_CHAT_LOCALHOST}/chats/${room_id}`,
        })
        setChatReady(true)
        setChats(res)
    }
    const readChat = async (room_id, user_id) => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_CHAT_LOCALHOST}/read-chats/${room_id}`,
            method: 'PATCH',
            body: JSON.stringify({
                user_id: user_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    useEffect(() => {
        readChat(room_id, user_id)
        getChats(room_id)
    }, [user_id, room_id])

    useEffect(() => {
        if (!socket) return

        socket.emit('room-join', { room_id: room_id })
        socket.on('room-joined', () => {
            getChats(room_id)
        })
        socket.on('message-sent', ({ message }) => {
            setChats((prev) => [...prev, { ...message, read: true }])
            socket.emit('receiver-seen-signal', { room_id: room_id })
        })

        socket.on('typing-started', () => setTyping(true))
        socket.on('typing-stopped', () => setTyping(false))

        socket.on('receiver-seen', () => {
            getChats(room_id)
        })
    }, [socket])

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
                            <p className="title">{unit && unit.name}</p>
                            <p>
                                {unit && unit.landlord.first_name}{' '}
                                {unit && unit.landlord.last_name}
                            </p>
                        </Box>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            // onClick={() => {
                            //     user_id === 1 ? setUserId(2) : setUserId(1)
                            // }}
                        >
                            <TbDotsVertical
                                style={{
                                    color: 'var(--fc-strong)',
                                    fill: 'var(--fc-strong)',
                                }}
                            />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {socket && (
                    <AvailModal
                        unit={unit}
                        user_id={user_id}
                        socket={socket}
                        room={room}
                        room_id={room_id}
                    />
                )}
            </Box>

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
