import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { IoClose } from 'react-icons/io5'
import { PiDownloadSimple } from 'react-icons/pi'
import Moment from 'react-moment'
import moment from 'moment'

import useImageManager from '../../hooks/data/image-hook'

import styles from './Messages.module.css'
import { useQuery } from '@tanstack/react-query'

const Messages = (props) => {
    const {
        chats,
        chatsReady,
        handleSend,
        containerRef,
        typing,
        user_id,
        room_id,
        isLoading,
        room,
    } = props

    const { fetchAvatar } = useImageManager()

    const [open, setOpen] = useState(false)
    const [fullImage, setFullImage] = useState(null)
    const [imageFullScreen, setImageFullScreen] = useState(false)
    const [focusedMessage, setFocusedMessage] = useState(null)
    const [avatar, setAvatar] = useState()

    const handleClose = () => {
        setOpen(false)
        setFullImage(null)
        setImageFullScreen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleFullScreen = () => {
        setImageFullScreen(!imageFullScreen)
    }

    const handleFocus = (id) => {
        setFocusedMessage(id)
    }

    const handleUnfocus = (id) => {
        setFocusedMessage(null)
    }

    const { data: convoAvatarData, isLoading: convoAvatarLoading } = useQuery({
        queryKey: ['convoAvatar', room?.unit_id],
        queryFn: async () => {
            let res = null
            if (room) {
                const recipient =
                    user_id === room.landlord_id ? room.tenant : room.landlord
                res = await fetchAvatar(recipient.profile_picture_img)
            }
            return res
        },
        refetchOnWindowFocus: false,
        enabled: !!room,
    })

    useEffect(() => {
        if (convoAvatarData) setAvatar(convoAvatarData)
    }, [convoAvatarData])

    let tmpChat = []
    let lastReadItem

    tmpChat = [...chats]
    lastReadItem = tmpChat
        ? tmpChat.reverse().find((item) => item.read === true)
        : {}

    const faq_list = [
        'When can I visit the unit?',
        'What is the area range of the unit?',
        'Are you available for in person negotiation?',
    ]
    const faq = chatsReady && chats.length === 0 && (
        <div className={styles['faq-container']}>
            {faq_list.map((faq_msg, index) => (
                <div
                    key={index}
                    className={styles['faq']}
                    onClick={() => {
                        handleSend(faq_msg)
                    }}
                >
                    {faq_msg}
                </div>
            ))}
        </div>
    )

    return (
        <React.Fragment>
            <div className={styles['message-container']}>
                <div className={styles['messages']} ref={containerRef}>
                    {faq}
                    {chats &&
                        chats.map((data, index) => {
                            let isLastSent = index === chats.length - 1

                            let timeDifferenceMs
                            let timeDifferenceMinutes
                            if (index > 0) {
                                let d1 = new Date(chats[index - 1].createdAt)
                                let d2 = new Date(chats[index].createdAt)
                                timeDifferenceMs = d2 - d1
                                timeDifferenceMinutes =
                                    timeDifferenceMs / (1000 * 60)
                            }

                            let now = new Date()
                            const date = moment(data.createdAt)

                            let dateFormat = 'MMM D [at] h:mm A'
                            if (date.isSame(now, 'day')) {
                                // Today
                                dateFormat = 'h:mm A'
                            }

                            const msgStyle =
                                data.type !== 'image'
                                    ? styles['chat-message']
                                    : styles['msg-image']

                            return data.is_system ? (
                                <div
                                    className={styles['system-container']}
                                    key={index}
                                >
                                    <p>{data.message}</p>
                                </div>
                            ) : (
                                <Box key={index}>
                                    {timeDifferenceMinutes > 20 && (
                                        <Box
                                            sx={{
                                                textAlign: 'center',
                                                marginBottom: '8px',
                                                marginTop: '8px',
                                            }}
                                            className="smaller-text"
                                        >
                                            <Moment format={dateFormat}>
                                                {data.createdAt}
                                            </Moment>
                                        </Box>
                                    )}
                                    {timeDifferenceMinutes < 20 &&
                                        focusedMessage === data._id && (
                                            <Box
                                                sx={{
                                                    textAlign: 'center',
                                                    marginBottom: '8px',
                                                    marginTop: '8px',
                                                }}
                                                className="smaller-text"
                                            >
                                                <Moment format={dateFormat}>
                                                    {data.createdAt}
                                                </Moment>
                                            </Box>
                                        )}

                                    <div
                                        className={
                                            data.sender_id === user_id
                                                ? styles['user-container']
                                                : styles['recipient-container']
                                        }
                                    >
                                        {data.sender_id !== user_id && (
                                            <div className={styles['chat-img']}>
                                                <img src={avatar} alt="" />
                                            </div>
                                        )}
                                        <div
                                            className={msgStyle}
                                            onClick={() => {
                                                if (focusedMessage !== data._id)
                                                    handleFocus(data._id)
                                                else handleUnfocus()
                                            }}
                                        >
                                            {data.type === 'image' ? (
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_BACKEND_LOCALHOST
                                                    }/api/chats-images/${room_id}/${
                                                        data.message
                                                    }`}
                                                    width="280"
                                                    alt="Message not found."
                                                    onClick={(e) => {
                                                        setFullImage(e)
                                                        setOpen(true)
                                                    }}
                                                />
                                            ) : (
                                                data.message
                                            )}
                                        </div>
                                    </div>
                                    {data.read &&
                                        lastReadItem &&
                                        lastReadItem._id === data._id && (
                                            <Box
                                                sx={{
                                                    textAlign: 'end',
                                                    marginBottom: '8px',
                                                }}
                                            >
                                                <p className="caption">Seen</p>
                                            </Box>
                                        )}
                                </Box>
                            )
                        })}
                </div>
                {typing && <p>Typing...</p>}
            </div>
            {fullImage && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: imageFullScreen
                            ? 'rgba(0,0,0,1)'
                            : 'rgba(255,255,255,1)',
                        transition: '.5s',
                    }}
                    open={open}
                    // onClick={handleClose}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                        onClick={() => imageFullScreen && handleFullScreen()}
                    >
                        {!imageFullScreen && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingInline: '8px',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        alignSelf: 'flex-start',
                                    }}
                                    size="large"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleClose}
                                >
                                    <IoClose
                                        style={{ fill: 'var(--accent)' }}
                                    />
                                </IconButton>
                            </Box>
                        )}

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingInline: !imageFullScreen && '8px',
                                transition: '.5s',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={fullImage.target.src}
                                alt=""
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    borderRadius: !imageFullScreen && '16px',
                                    transition: '.5s',
                                }}
                                onClick={handleFullScreen}
                            />
                        </Box>
                    </Box>
                </Backdrop>
            )}
        </React.Fragment>
    )
}

export default Messages
