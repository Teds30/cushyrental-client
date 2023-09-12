import React, {
    Fragment,
    useState,
    useRef,
    useCallback,
    useEffect,
} from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

import { HiOutlineLocationMarker } from 'react-icons/hi'

import styles from './BasicMap.module.css'

import custom_pin from '../../../../../assets/gmap/pin.svg'
const BasicMap = ({
    isLoaded,
    center = { lat: 13.14457855948287, lng: 123.72523867131375 },
    onChangeCenter,
    onUseCurrentLocation,
}) => {
    // const center = useMemo(() => ({ lat: 12.923675, lng: 124.123983 }), [])
    // const center = useMemo(() => ({ lat: 13.143966, lng: 123.725869 }), [])
    const [mapref, setMapRef] = React.useState(null)

    if (!isLoaded) return <div>Loading...</div>

    const handleOnLoad = (map) => {
        setMapRef(map)
    }

    const handleBoundsChanged = () => {
        if (mapref) {
            onChangeCenter({
                lat: mapref.getCenter().lat(),
                lng: mapref.getCenter().lng(),
            })
        }
    }

    return (
        <div className={styles['container']}>
            <div className={styles['drag']}>
                Drag map to your unit's exact location
            </div>

            <div
                className={styles['current-location']}
                onClick={onUseCurrentLocation}
            >
                <HiOutlineLocationMarker
                    size={24}
                    style={{
                        fill: 'transparent',
                        stroke: '#fff',
                    }}
                />
            </div>

            <div className={styles['centerMarker']}>
                <img src={custom_pin} />
            </div>
            {/* <div className={styles['centerMarker2']}></div> */}
            <GoogleMap
                id="map"
                zoom={17}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    mapId: 'd9e80ee42fd50abc',
                    fullscreenControl: false,
                    zoomControl: false,
                }}
                center={center}
                mapContainerClassName={styles['map-container']}
                onLoad={handleOnLoad}
                onDrag={handleBoundsChanged}
            >
                BasicMap
                {/* <Marker
                    position={newCenter}
                    // icon={{ url: '../../assets/pin.svg' }}
                ></Marker> */}
            </GoogleMap>
        </div>
    )
}

export default BasicMap
