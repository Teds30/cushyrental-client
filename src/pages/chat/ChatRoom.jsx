import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/http-hook'

import Moment from 'react-moment'
import moment from 'moment'

import styles from './Chats.module.css'
import { Link } from 'react-router-dom'

const ChatRoom = ({ room, user_id, socket }) => {
    const [chat, setChat] = useState('')
    const [chatCount, setChatCount] = useState()

    const { sendRequest } = useHttp()

    const getChats = async (room_id) => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_CHAT_LOCALHOST}/last-chat/${room_id}`,
        })
        // const data = await res.json()

        let lastChat = res.slice(-1)[0]
        setChat({ ...lastChat })
    }

    const getChatCount = async (room_id) => {
        const res = await sendRequest({
            url: `${
                import.meta.env.VITE_CHAT_LOCALHOST
            }/chats-count/${room_id}/${user_id}`,
        })

        if (res.count > 0) setChatCount(res.count)
        else setChatCount(null)
    }

    useEffect(() => {
        getChats(room._id)
        getChatCount(room._id)
    }, [])

    useEffect(() => {
        if (!socket) return

        socket.on('message-sent', ({ message }) => {
            getChats(room._id)
            getChatCount(room._id)
            // fetchRooms()
            // setChats((prev) => [...prev, { ...message, read: true }])
            // socket.emit('receiver-seen-signal', { room_id: room_id })
        })
    }, [socket])

    const currentDate = moment()
    const targetDate = moment(chat.updatedAt)

    let dateFormat
    // For all other dates
    dateFormat = 'MMM D'
    // Check if it's today
    if (currentDate.isSame(targetDate, 'day')) {
        dateFormat = 'H:mm'
    }

    // Check if it's within the current week
    if (currentDate.isSame(targetDate, 'week')) {
        dateFormat = 'ddd'
    }

    const messageStyle = !chat.read && chat.sender_id !== user_id ? 'title' : ''
    let msg
    if (chat && chat.type === 'text') {
        msg = chat.message
    } else if (chat && chat.type === 'image') {
        msg = `sent a photo.`
    } else {
        msg = ''
    }
    const message = chat.sender_id !== user_id ? msg : `You: ${msg}`

    return (
        <div className={styles['chat-container']}>
            <Link to={`/chats/${room.id}`}>
                <div className={styles['chat']}>
                    <div className={styles['chat-img']}>
                        <img src="" alt="" />
                    </div>
                    <div className={styles['chat-content']}>
                        <div
                            className={`${messageStyle} ${styles['chat-message']}`}
                        >
                            <p className="title">{room.name}</p>
                            <p>{message}</p>
                        </div>
                    </div>
                    <div className={styles['chat-details']}>
                        <p className="smaller-text">
                            <Moment fromNow ago format={dateFormat}>
                                {chat.updatedAt}
                            </Moment>
                        </p>
                        {chatCount && (
                            <div className={styles['times']}>
                                <span className="smaller-text">
                                    {chatCount}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatRoom
