import { useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, Circle } from '@react-google-maps/api'
import { useLoadScript } from '@react-google-maps/api'

import styles from './Map.module.css'

const Map = (props) => {
    const {
        radius,
        location = null,
        mapref,
        setMapRef,
        searchType,
        coordinates,
        setCoordinates,
        onMapLoad,
    } = props

    const [circleRef, setCircleRef] = useState(null)

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    // })

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
        const radiusMeters =
            radius === 1
                ? 500
                : radius === 2
                ? 1000
                : radius === 3
                ? 2000
                : 1000

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
                radius: radiusMeters,
            })
            setCircleRef(red)
        }
    }, [mapref])

    const [center, setCenter] = useState(
        coordinates ?? {
            lat: 13.143966,
            lng: 123.725869,
        }
    )

    useEffect(() => {
        if (location && location.location) {
            setCenter(location.location)
            if (circleRef) {
                circleRef.setCenter(location.location)
            }
        } else {
            setCenter(coordinates)
            if (circleRef) {
                circleRef.setCenter(coordinates)
            }
        }
    }, [location, coordinates])

    const handleMapDrag = (e) => {
        if (searchType === 1) {
            setCenter({
                lat: mapref.getCenter().lat(),
                lng: mapref.getCenter().lng(),
            })
            // setCoordinates({
            //     lat: mapref.getCenter().lat(),
            //     lng: mapref.getCenter().lng(),
            // })
        }
    }

    useEffect(() => {
        if (circleRef) {
            circleRef.setCenter({
                lat: mapref.getCenter().lat(),
                lng: mapref.getCenter().lng(),
            })
        }
    }, [searchType])
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
            if (searchType === 2) {
                google.maps.event.clearListeners(mapref, 'zoom_changed')
                google.maps.event.clearListeners(mapref, 'drag')
            }
        }
    }

    return (
        <div className={`${styles['map-container']}`}>
            {
                <GoogleMap
                    id="map"
                    zoom={14}
                    options={{
                        mapId: 'd9e80ee42fd50abc',
                        fullscreenControl: false,
                        zoomControl: false,
                        mapTypeControl: false,
                        streetViewControl: false,
                    }}
                    center={center}
                    mapContainerClassName={styles['map-container']}
                    onLoad={onMapLoad}
                    onDragEnd={handleMapDrag}
                >
                    {searchType === 2 && location && (
                        <Marker
                            position={location.location}
                            icon={{
                                // url: icon,
                                url: `/assets/universities/${location.icon}`,
                                scaledSize: new google.maps.Size(48, 60),
                            }}
                        />
                    )}
                    {searchType === 1 && (
                        <div className={styles['centerMarker']}></div>
                    )}
                </GoogleMap>
            }
        </div>
    )
}

export default Map
