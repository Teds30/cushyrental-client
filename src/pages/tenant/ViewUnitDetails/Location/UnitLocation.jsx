import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import PrimaryButton from '../../../../components/Button/PrimaryButton'

import styles from './UnitLocation.module.css'
import { FiChevronLeft } from 'react-icons/fi'
import { useLoadScript } from '@react-google-maps/api'
import { useContext } from 'react'
import UnitMap from './UnitMap'

const lib = ['places']

const UnitLocation = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const center_url = searchParams.get('center')

    const { id } = useParams()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    })

    const navigate = useNavigate()

    const [lat, lng] = center_url.split(',').map(parseFloat)

    const center = {
        lat,
        lng,
    }
    console.log('cener: ', center)
    // const [center, setCenter] = useState({
    //     lat: 13.14457855948287,
    //     lng: 123.72523867131375,
    // })

    const [mapref, setMapRef] = React.useState(null)

    const handleOnLoad = (map) => {
        setMapRef(map)
    }

    return (
        <div className={`${styles['location-container']}`}>
            <Box className={`${styles['top-back-container']} `}>
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
                    <Toolbar className={`${styles['toolbar-container']}`}>
                        <Link
                            to={`/unit/${id}`}
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     navigate(-1);
                            // }}
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
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box className={`${styles['manage-unit-title']}`}>
                            <p className="title">Location</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={`${styles['location-map']}`}>
                <UnitMap
                    mapRef={mapref}
                    onMapLoad={handleOnLoad}
                    isLoaded={isLoaded}
                    center={center}
                />
            </div>
        </div>
    )
}

export default UnitLocation
