import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import useUnitManager from '../../../hooks/data/units-hook'
import UnitDetails from './UnitDetails'
import Bookmark from './Bookmark'
import BorderedButton from '../../../components/Button/BorderedButton'
import CardBlur from '../../../components/Card/CardBlur'
import PrimaryButton from '../../../components/Button/PrimaryButton'

import styles from './ViewUnitDetails.module.css'
import CallIcon from '@mui/icons-material/Call'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import {
    BsBookmark,
    BsBookmarkFill,
    BsChatSquare,
    BsFillTelephoneOutboundFill,
} from 'react-icons/bs'

import { FiChevronLeft } from 'react-icons/fi'

import useHttp from '../../../hooks/http-hook'
import AuthContext from '../../../context/auth-context'
import UnitBookmark from './UnitBookmark'

const ViewUnitDetails = () => {
    // Access the client
    // const queryClient = useQueryClient()

    const { id } = useParams()
    const { fetchUnit } = useUnitManager()
    const navigate = useNavigate()

    const { sendRequest } = useHttp()
    const authCtx = useContext(AuthContext)

    // const [unitData, setUnitData] = useState({})
    const [scrolling, setScrolling] = useState(false)

    const { data: unitData, isLoading: unitLoading } = useQuery({
        queryKey: ['unit', id],
        queryFn: () => {
            return fetchUnit(id)
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    useEffect(() => {
        // const handleScroll = () => {
        //     if (window.scrollY > 20) {
        //         setScrolling(true)
        //     } else {
        //         setScrolling(false)
        //     }
        // }
        // window.addEventListener('scroll', handleScroll)
        // return () => {
        //     window.removeEventListener('scroll', handleScroll)
        // }
    }, [scrolling])

    const handleInquire = async () => {
        // SOON: ALLOW NON-AUTHENTICATED USER
        try {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_CHAT_LOCALHOST
                }/find-existing-room/${id}/${authCtx.user.id}`,
            })

            if (res) {
                navigate(`/chats/${res._id}`)
                return
            }

            const newRoom = await sendRequest({
                url: `${import.meta.env.VITE_CHAT_LOCALHOST}/new-room`,
                method: 'POST',
                body: JSON.stringify({
                    name: unitData.name,
                    unit_id: id,
                    landlord_id: unitData.landlord_id,
                    tenant_id: authCtx.user.id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (newRoom) {
                navigate(`/chats/${newRoom._id}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return unitLoading ? (
        <p>Loading...</p>
    ) : (
        Object.keys(unitData).length !== 0 && (
            <div className={`${styles['unit-details-container']}`}>
                <Box
                    className={`${styles['top-back-container']} ${
                        scrolling ? styles['scrolling'] : ''
                    }`}
                >
                    <AppBar
                        position="static"
                        className={`${styles['app-bar-container']}`}
                        sx={{
                            margin: 0,
                            fontFamily: 'Inter',
                            boxShadow: 'none',
                            display: 'flex',
                            background: 'transparent',
                        }}
                    >
                        <Toolbar className={`${styles['toolbar-container']}`}>
                            <div className={`${styles['back-button']}`}>
                                <Link
                                    // to={`/manage_unit/edit/`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        navigate(-1, { replace: true })
                                    }}
                                    className={`${styles['link-button']}`}
                                >
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                    >
                                        <FiChevronLeft
                                            style={{
                                                fill: 'transparent',
                                                color: scrolling
                                                    ? 'var(--fc-strong)'
                                                    : 'white',
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                                <Box className={`${styles['app-bar-title']}`}>
                                    <p className="title">{unitData.name}</p>
                                </Box>
                            </div>
                            {authCtx.user &&
                                authCtx.user.id !== unitData.landlord_id && (
                                    <div className={`${styles['bookmark']}`}>
                                        <UnitBookmark
                                            scrolling={scrolling}
                                            unitId={unitData.id}
                                        />
                                    </div>
                                )}
                        </Toolbar>
                    </AppBar>
                </Box>
                <UnitDetails unit={unitData} />
                <div className={`${styles['view-details-botton-section']}`}>
                    <CardBlur style={{ display: 'flex' }}>
                        {authCtx.user &&
                        authCtx.user.id !== unitData.landlord_id ? (
                            <div className={`${styles['view-details-botton']}`}>
                                <a
                                    href={`tel:${unitData.landlord.phone_number}`}
                                    // href="tel:+63963-276-6237"
                                    target="_parent"
                                    style={{ width: '100%' }}
                                >
                                    <BorderedButton
                                        width="100%"
                                        leftIcon={
                                            <BsFillTelephoneOutboundFill />
                                        }
                                    >
                                        Call
                                    </BorderedButton>
                                </a>
                                <PrimaryButton
                                    width="100%"
                                    leftIcon={<BsChatSquare />}
                                    onClick={handleInquire}
                                >
                                    Inquire Now
                                </PrimaryButton>
                            </div>
                        ) : (
                            <Link to={`/manage_unit/edit/${unitData.id}`}>
                                <PrimaryButton width="100%">
                                    Manage unit
                                </PrimaryButton>
                            </Link>
                        )}
                    </CardBlur>
                </div>
            </div>
        )
    )
}

export default ViewUnitDetails
