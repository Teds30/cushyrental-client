import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import PrimaryButton from '../../components/Button/PrimaryButton'
import SecondaryButton from '../../components/Button/SecondaryButton'
import BorderedButton from '../../components/Button/BorderedButton'

import Quantity from '../../components/Quantity/Quantity'

import useHttp from '../../hooks/http-hook'

import { BsExclamationCircle } from 'react-icons/bs'
import { TbCircleCheck } from 'react-icons/tb'

import styles from './AvailModal.module.css'

const AvailModal = (props) => {
    const { user_id, socket, room_id, room, unit } = props
    const { sendRequest, isLoading } = useHttp()

    const [roomDetails, setRoomDetails] = useState({
        request: 'none',
        req_slots: 0,
    })
    const [quantity, setQuantity] = useState({ value: 0 })
    const [availToggle, setAvailToggle] = useState(false)

    useEffect(() => {
        const fetchData = async (room_id) => {
            const res = await fetch(
                `${import.meta.env.VITE_CHAT_LOCALHOST}/rooms/${room_id}`
            )
            const data = await res.json()

            setRoomDetails({
                request: data.request_status,
                req_slots: data.slots,
            })
        }

        fetchData(room_id)
    }, [unit])

    const addRental = async () => {
        try {
            const currentDate = new Date()

            // Get the year, month, and day
            const year = currentDate.getFullYear()
            const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0') // Add 1 to get the correct month and pad with zeros if needed
            const day = currentDate.getDate().toString().padStart(2, '0') // Pad with zeros if needed

            // Format the date as "YYYY-MM-DD"
            const formattedDate = `${year}-${month}-${day}`

            const res1 = await fetch(
                `${import.meta.env.VITE_CHAT_LOCALHOST}/rooms/${room_id}`
            )
            const data1 = await res1.json()

            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/rentals/`,
                method: 'POST',
                body: JSON.stringify({
                    user_id: room.tenant_id,
                    unit_id: unit.id,
                    slots: data1.slots,
                    monthly_amount: unit.price,
                    due_date: 28,
                    date_start: formattedDate,
                    date_end: '',
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!socket) return

        socket.on('unit-avail-pending', () =>
            setRoomDetails({ request: 'pending' })
        )
        socket.on('unit-avail', () => setRoomDetails({ request: null }))
        socket.on('unit-avail-accepted', () => {
            setRoomDetails({ request: 'accepted' })
        })
        socket.on('unit-avail-rejected', () =>
            setRoomDetails({ request: 'rejected' })
        )
    }, [socket])

    const handleAvail = () => {
        socket.emit('unit-avail', {
            slots: quantity.value,
            room_id: room_id,
            request_status: 'avail',
            name: 'Tya Els',
            read: false,
        })
    }
    const handleCancel = () => {
        socket.emit('unit-avail', {
            room_id: room_id,
            request_status: 'cancel',
            name: 'Tya Els',
            read: false,
        })
    }

    const handleAccept = () => {
        socket.emit('unit-avail', {
            room_id: room_id,
            request_status: 'accept',
            name: 'Tya Els',
            read: false,
        })
        addRental()
    }

    const handleReject = () => {
        socket.emit('unit-avail', {
            room_id: room_id,
            request_status: 'reject',
            name: 'Tya Els',
            read: false,
        })
    }

    let content

    if (room && roomDetails.request !== 'none') {
        content = room.landlord_id !== user_id && (
            <PrimaryButton
                width="100%"
                onClick={() => {
                    setAvailToggle(true)
                }}
            >
                Avail Unit
            </PrimaryButton>
        )
    }

    if (room && availToggle) {
        content = room.landlord_id !== user_id && (
            <Box>
                <div className={styles['info-container']}>
                    <div className={styles['avail-content']}>
                        <div className={styles['quantity']}>
                            <Quantity
                                maxValue={unit && unit.slots}
                                onQuantity={setQuantity}
                            />
                            <p>Occupancies</p>
                        </div>
                        <div className={styles['vr-container']}>
                            <div className={styles['vr']}></div>
                        </div>
                        <div className={styles['slots']}>
                            <h2>{unit && unit.slots}</h2>
                            <p className="title">SLOTS</p>
                        </div>
                    </div>
                </div>
                <Box
                    sx={{
                        paddingTop: '12px',
                        background: 'var(--bg-layer1)',
                        display: 'flex',
                        gap: '18px',
                    }}
                >
                    <SecondaryButton
                        width="100%"
                        btnSize="small"
                        onClick={() => {
                            setAvailToggle(false)
                        }}
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        width="100%"
                        disabled={quantity.value > 0 ? false : true}
                        onClick={handleAvail}
                    >
                        Avail Unit
                    </PrimaryButton>
                </Box>
            </Box>
        )
    }

    if (roomDetails.request === 'pending') {
        content =
            room.landlord_id === user_id ? (
                <Box>
                    <div className={styles['info-container']}>
                        <div className={styles['info-icon']}>
                            <BsExclamationCircle
                                style={{ fill: '#5893EB' }}
                                size={'18px'}
                            />
                        </div>
                        <p className={'smaller-text'}>
                            Jano is requesting a rental for this unit.
                        </p>
                    </div>
                    <Box
                        sx={{
                            paddingTop: '12px',
                            background: 'var(--bg-layer1)',
                            display: 'flex',
                            gap: '18px',
                        }}
                    >
                        <BorderedButton
                            width="100%"
                            btnType="danger"
                            btnSize="small"
                            onClick={handleReject}
                        >
                            Reject
                        </BorderedButton>
                        <PrimaryButton width="100%" onClick={handleAccept}>
                            Accept
                        </PrimaryButton>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <div className={styles['info-container']}>
                        <div className={styles['info-icon']}>
                            <BsExclamationCircle
                                style={{ fill: '#5893EB' }}
                                size={'18px'}
                            />
                        </div>
                        <p className={'smaller-text'}>
                            Waiting for the landlord's confirmation.
                        </p>
                    </div>
                    <Box
                        sx={{
                            paddingTop: '12px',
                            background: 'var(--bg-layer1)',
                        }}
                    >
                        <BorderedButton
                            width="100%"
                            btnType="danger"
                            btnSize="small"
                            onClick={handleCancel}
                        >
                            Cancel Avail
                        </BorderedButton>
                    </Box>
                </Box>
            )
    }

    if (roomDetails.request === 'accepted') {
        content = (
            <div className={styles['info-container']}>
                <div
                    className={`${styles['info-icon']} ${styles['info-icon-accepted']}`}
                >
                    <TbCircleCheck
                        style={{ stroke: '#58EBAD', fill: 'transparent' }}
                        size={'18px'}
                    />
                </div>
                <p className={'smaller-text'}>The request has been accepted.</p>
            </div>
        )
    }

    if (room && room.landlord_id === user_id && !roomDetails.request) {
        return
    }

    return (
        <Box
            sx={{
                padding: '12px 18px',
                background: 'var(--bg-layer1)',
                boxShadow: '0 4px 4px rgba(0,0,0,.08)',
            }}
        >
            {content}
        </Box>
    )
}

export default AvailModal
