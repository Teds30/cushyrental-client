import React, { useEffect, useState, useContext } from 'react'
import useHttp from '../../hooks/http-hook'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import { TbChevronLeft, TbDotsVertical } from 'react-icons/tb'

import styles from './Chats.module.css'
import ChatRoom from './ChatRoom'

import SearchField from '../../components/Search/SearchField'

import AuthContext from '../../context/auth-context'

const Chats = () => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)

    const [initialRooms, setInitialRooms] = useState([])
    const [rooms, setRooms] = useState(initialRooms)
    const [socket, setSocket] = useState(null)

    const { sendRequest, isLoading } = useHttp()

    const fetchRooms = async (userId) => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_CHAT_LOCALHOST}/rooms`,
            method: 'POST',
            body: JSON.stringify({ userId: userId }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log('asd: ', userId)

        setRooms(res.rooms)
        setInitialRooms(res.rooms)
    }
    useEffect(() => {
        setSocket(
            io(import.meta.env.VITE_CHAT_LOCALHOST, {
                transports: ['websocket'],
            })
        )

        console.log(authCtx.user)
        if (authCtx.user) fetchRooms(authCtx.user.id)
    }, [authCtx.user])

    const handleSearch = (e) => {
        const keywords = e.target.value
        const newList = initialRooms.filter((data) => {
            return data.name.toLowerCase().includes(keywords.toLowerCase())
        })
        setRooms(newList)
    }

    const chatRooms =
        authCtx.user &&
        rooms &&
        rooms.map((room) => {
            socket.emit('room-join', { room_id: room._id })
            return (
                <ChatRoom
                    key={room._id}
                    room={room}
                    user_id={authCtx.user.id}
                    socket={socket}
                />
            )
        })

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div className={styles['col1']}>
                    <Link
                        to="/home"
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <TbChevronLeft
                                style={{
                                    color: '#fff',
                                    fill: 'transparent',
                                }}
                            />
                        </IconButton>
                    </Link>
                    <h2>Chats</h2>
                </div>
                <div className={styles['col2']}>
                    <div className={styles['profile-pic']}>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>

            <div className={styles['content']}>
                <div className={styles['search-box']}>
                    <SearchField
                        placeholder="Seach a user"
                        onChange={handleSearch}
                    />
                </div>
                <h3>Recents</h3>
                <div className={styles['chats']}>
                    {isLoading ? <p>Loading...</p> : chatRooms}
                </div>
            </div>
        </div>
    )
}

export default Chats
