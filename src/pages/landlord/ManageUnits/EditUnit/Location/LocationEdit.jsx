import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'

import { useLoadScript, LoadScript } from '@react-google-maps/api'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import useNotistack from '../../../../../hooks/notistack-hook'

import PrimaryButton from '../../../../../components/Button/PrimaryButton'
import SearchField from '../../../../../components/Search/SearchField'
import CreateUnitContext from '../../../../../context/create-unit-context'
import styles from '../../CreateUnit/CreateUnit.module.css'
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
import useUnitManager from '../../../../../hooks/data/units-hook'

const lib = ['places']

const Location = (props) => {
    const { oldLocation } = props
    const { id } = useParams()
    const createUnitCtx = useContext(CreateUnitContext)
    const navigate = useNavigate()
    const location = useLocation()
    const receivedData = location.state
    const { updateLocation, isLoading } = useUnitManager()
    const {notify} = useNotistack();

    const [lat, lng] = receivedData.location.split(', ').map(parseFloat);

    const newCoordinatesObject = { lat, lng }

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
    const [center, setCenter] = useState(newCoordinatesObject)

    const [newCenter, setNewCenter] = useState(center)

    const handleCurrentLocation = () => {
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
    }

    const saveHandler = async () => {
        // event.preventDefault()
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

        // const res = await updateLocation(id, location.lat, location.lng, address)
        
        const data = {id: Number(id), location: location.lat + ', ' + location.lng, address: address};

        console.log(data);

        try {
            const res = await updateLocation(data);
            navigate(`/manage_unit/edit/${id}`)
            notify("Location updated successfully", "success" );
        } catch (error){}

        // createUnitCtx.onUnitData({
        //     ...createUnitCtx.unitData,
        //     location: location.lat + ', ' + location.lng,
        //     address: address,
        //     location_done: true
        // })
        // navigate(`/manage_unit/edit/${id}`)
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
                        <Link to={`/manage_unit/edit/${id}`}>
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
                        <PrimaryButton onClick={saveHandler} isLoading={isLoading} disabled={isLoading}>
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
