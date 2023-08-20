import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import TextField from '../../components/TextField/TextField'

import { TbChevronLeft } from 'react-icons/tb'
import { BsCamera } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'

import styles from './Conversation.module.css'

const Conversation = (props) => {
    const { room_id } = useParams()
    const user_id = 3

    const [socket, setSocket] = useState(null)
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const [typing, setTyping] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState()
    const container = useRef()

    useEffect(() => {
        setSocket(
            io('https://cushyrental-chat-fe02ec9a5b8b.herokuapp.com/', {
                transports: ['websocket'],
            })
        )
    }, [])

    useEffect(() => {
        if (!socket) return

        socket.emit('room-join', { room_id: room_id })
        socket.on('room-joined', () => {
            console.log('room joined')
        })
        socket.on('message-sent', ({ message }) => {
            console.log(message)
            setChats((prev) => [...prev, { message: message }])
        })

        socket.on('typing-started', () => setTyping(true))
        socket.on('typing-stopped', () => setTyping(false))
    }, [socket])

    console.log(typing)

    const handleSend = () => {
        if (!message) return
        socket.emit('send-message', {
            message,
            sender_id: user_id,
            room_id: room_id,
        })

        // setChats((prev) => [
        //     ...prev,
        //     {
        //         message: {
        //             message,
        //             sender_id: 2,
        //             room_id: '64e124a91d7dfeef232f22ff',
        //         },
        //         received: false,
        //     },
        // ])
    }
    useEffect(() => {
        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight
        }
    })
    return (
        <div className={styles['container']}>
            <Box>
                <AppBar
                    position="fixed"
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
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <TbChevronLeft
                                style={{ color: 'var(--fc-strong)' }}
                            />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}>
                            <p className="title">
                                Tya Els Ultimate Boarding House
                            </p>
                            <p>Tya Els</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={styles['message-container']}>
                <div className={styles['messages']} ref={container}>
                    {chats &&
                        chats.map((data, index) => (
                            <div
                                className={
                                    data.message.sender_id === user_id
                                        ? styles['user-container']
                                        : styles['recipient-container']
                                }
                                key={index}
                            >
                                {data.message.sender_id !== user_id && (
                                    <div className={styles['chat-img']}></div>
                                )}
                                <div className={styles['chat-message']}>
                                    {data.message.message}
                                </div>
                            </div>
                        ))}
                </div>
                {typing && <p>Typing...</p>}
            </div>

            <div className={styles['message-box']}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <BsCamera style={{ fill: 'var(--fc-body)' }} />
                </IconButton>
                <TextField
                    fullWidth
                    label="Write a message..."
                    onChange={(e) => {
                        setMessage(e.target.value)
                        socket.emit('typing-start', { room_id })

                        if (typingTimeout) {
                            clearTimeout(typingTimeout)
                        }

                        setTypingTimeout(
                            setTimeout(() => {
                                socket.emit('typing-stop', { room_id })
                            }, 1000)
                        )
                    }}
                />
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleSend}
                    disabled={!message}
                >
                    <IoSend
                        style={{
                            fill: message
                                ? 'var(--accent)'
                                : 'var(--fc-body-lighter)',
                        }}
                    />
                </IconButton>
            </div>
        </div>
    )
}

export default Conversation
