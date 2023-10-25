import React, {
    Fragment,
    useState,
    useRef,
    useCallback,
    useEffect,
    useContext,
} from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

import styles from './UnitMap.module.css'

import custom_pin from '../../../../assets/gmap/unit_64.svg'

const UnitMap = ({
    isLoaded = true,
    center = { lat: '', lng: '' },
    onMapLoad,
}) => {
    if (!isLoaded) return <div>Loading...</div>

    // const handleOnLoad = (map) => {
    //     setMapRef(map)
    // }

    return (
        <div className={styles['container']}>
            <GoogleMap
                id="map"
                zoom={17}
                options={{
                    streetViewControl: true,
                    mapTypeControl: true,
                    mapId: 'd9e80ee42fd50abc',
                    fullscreenControl: false,
                    zoomControl: false,
                }}
                center={center}
                mapContainerClassName={styles['map-container']}
                onLoad={onMapLoad}
            >
                <Marker position={center} icon={custom_pin}></Marker>
            </GoogleMap>
        </div>
    )
}

export default UnitMap
