import React, { useEffect, useState, cache } from 'react'
import useHttp from '../../hooks/http-hook'

import Moment from 'react-moment'
import moment from 'moment'

import styles from './Chats.module.css'
import { Link } from 'react-router-dom'

import UserAvatar from '../../components/Avatar/UserAvatar'

import useUserManager from '../../hooks/data/users-hook'
import useUnitManager from '../../hooks/data/units-hook'
import useImageManager from '../../hooks/data/image-hook'
import { useQuery } from '@tanstack/react-query'

const ChatRoom = ({ room, user_id, socket }) => {
    const [chat, setChat] = useState('')
    const [chatCount, setChatCount] = useState()
    const [unitImg, setUnitImg] = useState(null)

    const recipient_id =
        user_id === room.landlord_id ? room.tenant_id : room.landlord_id

    const { fetchUnit } = useUnitManager()
    const { fetchImage } = useImageManager()

    const { sendRequest } = useHttp()

    const {
        data: chatUnitImageData,
        isLoading: chatUnitImageLoading,
        refetch: chatUnitImageRefetch,
    } = useQuery({
        queryKey: ['chatUnitImage', room?._id],
        queryFn: async () => {
            if (room) {
                const res = await fetchUnit(room.unit_id)

                const img = await fetchImage(
                    res.images[0].image.replace('images/', '')
                )

                return img
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!room,
    })

    useEffect(() => {
        if (chatUnitImageData) setUnitImg(chatUnitImageData)
    }, [chatUnitImageData])

    const {
        data: lastChatData,
        isLoading: lastChatLoading,
        refetch: lastChatRefetch,
    } = useQuery({
        queryKey: ['lastChat', room?._id],
        queryFn: async () => {
            if (room) {
                const res = await sendRequest({
                    url: `${import.meta.env.VITE_CHAT_LOCALHOST}/last-chat/${
                        room._id
                    }`,
                })

                let lastChat = res.slice(-1)[0]

                return lastChat
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!room,
    })

    const {
        data: chatCountData,
        isLoading: chatCountLoading,
        refetch: chatCountRefetch,
    } = useQuery({
        queryKey: ['chatCount', room?._id],
        queryFn: async () => {
            if (room) {
                const res = await sendRequest({
                    url: `${import.meta.env.VITE_CHAT_LOCALHOST}/chats-count/${
                        room._id
                    }/${user_id}`,
                })

                return res
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!room && !!user_id,
    })

    useEffect(() => {
        if (lastChatData) {
            setChat({ ...lastChatData })
        }
    }, [lastChatData])

    useEffect(() => {
        if (chatCountData?.count > 0) setChatCount(chatCountData.count)
        else setChatCount(null)
    }, [chatCountData])

    useEffect(() => {
        if (!socket) return

        socket.on('message-sent', ({ message }) => {
            lastChatRefetch()
            chatCountRefetch()
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
            <Link to={`/chats/${room._id}`}>
                <div className={styles['chat']}>
                    <div className={styles['chat-img']}>
                        <img src={unitImg} alt="" />
                        {user_id === room.landlord_id && (
                            <div className={styles['tenant-img']}>
                                <UserAvatar
                                    avatar_url={room.user.profile_picture_img}
                                    size="24px"
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles['chat-content']}>
                        <div
                            className={`${messageStyle} ${styles['chat-message']}`}
                        >
                            {user_id === room.landlord_id ? (
                                <p className="title">
                                    {room.user.first_name} {room.user.last_name}{' '}
                                    <span className="">• {room.name}</span>
                                </p>
                            ) : (
                                <p className="title">{room.name}</p>
                            )}

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
