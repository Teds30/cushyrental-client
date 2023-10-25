import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useLoadScript, LoadScript } from '@react-google-maps/api'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import PrimaryButton from '../../../../../components/Button/PrimaryButton'
import SearchField from '../../../../../components/Search/SearchField'
import CreateUnitContext from '../../../../../context/create-unit-context'

import styles from '../CreateUnit.module.css'
import photo from '../../../../../assets/Units/pics.png'
import { FiChevronLeft } from 'react-icons/fi'
import BasicMap from './BasicMap'

import { useGeolocated } from 'react-geolocated'
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from 'react-geocode'

const lib = ['places']

const Location = (props) => {
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    // })
    // const history = useHistory();
    const createUnitCtx = useContext(CreateUnitContext)
    const navigate = useNavigate()

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        })

    const [mapref, setMapRef] = React.useState(null)
    const handleOnLoad = (map) => {
        setMapRef(map)
    }
    const [center, setCenter] = useState({
        lat: 13.14457855948287,
        lng: 123.72523867131375,
    })
    const [newCenter, setNewCenter] = useState(center)

    const handleCurrentLocation = () => {
        // navigator.geolocation.getCurrentPosition((position) => {
        //     const { latitude, longitude } = position.coords
        //     setCenter({ lat: latitude, lng: longitude })
        // })
        // options for current position
        const navigatorLocationOptions = {
            enableHighAccuracy: true,
            timeout: 7000,
            maximumAge: 0,
        }

        if (isGeolocationEnabled) {
            if (isGeolocationAvailable) {
                const { latitude, longitude } = coords
                setCenter({ lat: latitude, lng: longitude })
                setNewCenter({ lat: latitude, lng: longitude })
            }
        }

        if (!isGeolocationEnabled) {
            alert('Browser location services disabled')
        }

        // does browser have geo services enabled
        // navigator.permissions.query({ name: 'geolocation' }).then(
        //     (result) => {
        //         if (result.state === 'granted') {
        //             // you are good
        //             navigator.geolocation.getCurrentPosition(
        //                 (position) => {
        //                     // alert('granted user location permission')
        //                     // console.log(
        //                     //     'granted user location permission',
        //                     //     position
        //                     // )

        //                     const { latitude, longitude } = position.coords
        //                     setCenter({ lat: latitude, lng: longitude })
        //                     setNewCenter({ lat: latitude, lng: longitude })

        //                     //.. do your stuff
        //                 },
        //                 (error) => {
        //                     alert('Please turn on OS located services')
        //                     // OS services are not enabled
        //                     console.log(
        //                         'Please turn on OS located services',
        //                         navigator
        //                     )
        //                     errorLocation()
        //                 },
        //                 navigatorLocationOptions
        //             )
        //         } else {
        //             // browser issues seriveces
        //             alert('Browser location services disabled')
        //             console.log('Browser location services disabled', navigator)
        //             errorLocation()
        //         }
        //     },
        //     (error) => {
        //         /* Browser doesn't support querying for permissions */

        //         alert('Please turn on BROWSER location services')
        //         console.log(
        //             'Please turn on BROWSER location services',
        //             navigator
        //         )
        //         errorLocation()
        //     }
        // )

        // //handle errors
        // function errorLocation() {
        //     console.log('error')
        // }
    }

    const saveHandler = async (event) => {
        event.preventDefault()
        setKey(import.meta.env.VITE_GOOGLE_MAP_API)
        let address

        await geocode(RequestType.LATLNG, `${newCenter.lat},${newCenter.lng}`)
            .then(({ results }) => {
                const address_components = results[0].address_components
                address = `${address_components[0].long_name} ${address_components[1].long_name}`
            })
            .catch(console.error)

        console.log(address)
        const unit_new_location = JSON.stringify(newCenter)
        const location = JSON.parse(unit_new_location)

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            location: location.lat + ', ' + location.lng,
            address: address,
            location_done: true
        })
        navigate('/manage_unit/create_unit')
        // save
    }

    const handleChangeCenter = (coords) => {
        // console.log(coords)
        setCenter(coords)
    }

    const handleChangeCoords = (coords) => {
        setNewCenter(coords)
    }

    return (
        <div className={`${styles['location-map-container']}`}>
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
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link to="/manage_unit/create_unit">
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
                        <Box>
                            <p className="title">Location</p>
                        </Box>
                        <PrimaryButton onClick={saveHandler}>
                            Save
                        </PrimaryButton>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles['location-map']}`}>
                <LoadScript
                    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
                    libraries={lib}
                    onLoad={handleOnLoad}
                >
                    <BasicMap
                        mapRef={mapref}
                        onMapLoad={handleOnLoad}
                        // isLoaded={isLoaded}
                        center={center}
                        onChangeCenter={handleChangeCenter}
                        onChangeCoords={handleChangeCoords}
                        onUseCurrentLocation={handleCurrentLocation}
                    />
                </LoadScript>
            </div>
        </div>
    )
}

export default Location
