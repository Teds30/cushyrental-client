import { useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, Circle } from '@react-google-maps/api'
import { useLoadScript } from '@react-google-maps/api'

import styles from './Map.module.css'

const Map = (props) => {
    const { radius } = props

    console.log(radius)

    const [mapref, setMapRef] = useState(null)
    const [circleRef, setCircleRef] = useState(null)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    })

    const handleOnLoad = (map) => {
        setMapRef(map)
    }

    let red

    useEffect(() => {
        const radiusMeters =
            radius === 1
                ? 500
                : radius === 2
                ? 1000
                : radius === 3
                ? 2000
                : 1000

        if (circleRef) circleRef.setRadius(radiusMeters)
    }, [radius])
    useEffect(() => {
        if (mapref) {
            red = new google.maps.Circle({
                strokeColor: '#2666b7',
                strokeOpacity: 0.2,
                strokeWeight: 2,
                fillColor: '#2666b7',
                fillOpacity: 0.05,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                map: mapref,
                center: center,
                radius: 1000,
            })
            setCircleRef(red)
        }
    }, [mapref])

    const [center, setCenter] = useState({ lat: 13.143966, lng: 123.725869 })
    const [markerPosition, setMarkerPosition] = useState({
        lat: 13.143966,
        lng: 123.725869,
    })

    const handleMapDrag = (e) => {
        setCenter({
            lat: mapref.getCenter().lat(),
            lng: mapref.getCenter().lng(),
        })
    }

    if (mapref) {
        if (circleRef) {
            mapref.addListener('drag', () => {
                circleRef.setCenter({
                    lat: mapref.getCenter().lat(),
                    lng: mapref.getCenter().lng(),
                })
            })
            mapref.addListener('zoom_changed', () => {
                circleRef.setCenter({
                    lat: mapref.getCenter().lat(),
                    lng: mapref.getCenter().lng(),
                })
            })
        }
    }
    return (
        <div className={`${styles['map-container']}`}>
            {isLoaded && (
                <GoogleMap
                    id="map"
                    zoom={17}
                    options={{
                        streetViewControl: true,
                        mapTypeControl: true,
                        mapId: 'd9e80ee42fd50abc',
                        fullscreenControl: false,
                        // zoomControl: false,
                    }}
                    center={center}
                    mapContainerClassName={styles['map-container']}
                    onLoad={handleOnLoad}
                    onDragEnd={handleMapDrag}
                >
                    <div className={styles['centerMarker']}></div>
                </GoogleMap>
            )}
        </div>
    )
}

export default Map
