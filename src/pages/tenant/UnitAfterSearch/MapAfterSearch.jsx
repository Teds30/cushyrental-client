import React, { useState } from 'react'
import {
    Circle,
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript,
} from '@react-google-maps/api'

import styles from './UnitAfterSearch.module.css'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import InfoWindowUnit from './InfoWindowUnit'

const MapAfterSearch = (props) => {
    const { center, radius, units } = props
    const [mapref, setMapRef] = useState()
    const [activeMarker, SetActiveMarker] = useState()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    })

    const handleOnLoad = (map) => {
        setMapRef(map)
    }

    const option = {
        strokeColor: '#2666b7',
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: '#2666b7',
        fillOpacity: 0.15,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius:
            radius === 1
                ? 500
                : radius === 2
                ? 1000
                : radius === 3
                ? 2000
                : 500,
        zIndex: 1,
    }

    const changeActiveMarker = (id) => {
        SetActiveMarker(id)
    }

    let unitMarkers = <></>
    unitMarkers = units.map((unit) => {
        const [lat, lng] = unit.location.split(', ').map(Number)
        const coords = { lat, lng }
        return (
            <Marker
                key={unit.id}
                icon={{ url: '/assets/unit.svg' }}
                position={coords}
                onClick={() => {
                    changeActiveMarker(unit.id)
                }}
            >
                {activeMarker === unit.id ? (
                    <InfoWindow
                        onCloseClick={() => SetActiveMarker(null)}
                        className={styles['info-window']}
                    >
                        <InfoWindowUnit unit={unit} />
                    </InfoWindow>
                ) : null}
            </Marker>
        )
    })

    return (
        <div className={styles['padding-top-container']}>
            <div className={styles['map-container']}>
                {isLoaded && (
                    <GoogleMap
                        id="map"
                        zoom={17}
                        options={{
                            mapId: 'd9e80ee42fd50abc',
                            fullscreenControl: true,
                            zoomControl: false,
                            mapTypeControl: true,
                            streetViewControl: true,
                        }}
                        center={center}
                        mapContainerClassName={styles['map-container']}
                        onLoad={handleOnLoad}
                    >
                        <Marker position={center}></Marker>
                        {unitMarkers}
                        <Circle center={center} options={option}></Circle>
                    </GoogleMap>
                )}
            </div>
        </div>
    )
}

export default MapAfterSearch
