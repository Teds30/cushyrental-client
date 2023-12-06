import React, { useRef, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { BsCamera, BsThreeDotsVertical } from 'react-icons/bs'
import { IoImageOutline } from 'react-icons/io5'
import { IoSend } from 'react-icons/io5'
import TextField from '../../components/TextField/TextField'

import styles from './MessageBox.module.css'

const MessageBox = (props) => {
    const { handleSend, socket, room_id, user_id, setChats } = props

    const [message, setMessage] = useState('')
    const [typingTimeout, setTypingTimeout] = useState()
    const fileRef = useRef()

    const selectFile = () => {
        fileRef.current.click()
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (file.type.startsWith('image/')) {
            const formData = new FormData()

            formData.append('image', file)
            formData.append('name', 'chat_image')
            formData.append('path', `chats/${room_id}`)

            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/image-upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                )

                const data = await res.json()

                setChats((prev) => [
                    ...prev,
                    {
                        type: 'image',
                        message: `${data.name}`,
                        sender_id: user_id,
                        room_id: room_id,
                        createdAt: new Date().toISOString(),
                    },
                ])
                socket.emit('send-message', {
                    type: 'image',
                    message: `${data.name}`,
                    sender_id: user_id,
                    room_id: room_id,
                    createdAt: new Date().toISOString(),
                })

                socket.emit('message-to-read', { room_id: room_id })
                return data
            } catch (err) {}
        }

        console.log({ error: 'File is not an image.' })

        return { error: 'File is not an image.' }
    }

    return (
        <div className={styles['message-box']}>
            <input
                onChange={handleFileUpload}
                ref={fileRef}
                type="file"
                style={{ display: 'none' }}
            />
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={selectFile}
            >
                <IoImageOutline style={{ fill: 'var(--fc-body)' }} />
            </IconButton>
            <TextField
                autoComplete="off"
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
                value={message}
            />
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                    handleSend(message)
                    setMessage('')
                }}
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
    )
}

export default MessageBox
