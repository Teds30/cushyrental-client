import React, {
    Fragment,
    useState,
    useRef,
    useCallback,
    useEffect,
    useContext,
} from 'react'
import {
    GoogleMap,
    Marker,
    StandaloneSearchBox,
    LoadScript,
} from '@react-google-maps/api'
import CreateUnitContext from '../../../../../context/create-unit-context'

import { HiOutlineLocationMarker } from 'react-icons/hi'

import styles from './BasicMap.module.css'

import custom_pin from '../../../../../assets/gmap/pin.svg'
import SearchField from '../../../../../components/Search/SearchField'
const BasicMap = ({
    isLoaded = true,
    center = { lat: 13.14457855948287, lng: 123.72523867131375 },
    onChangeCenter,
    onChangeCoords,
    onUseCurrentLocation,
    onMapLoad,
    mapRef,
}) => {
    // const center = useMemo(() => ({ lat: 12.923675, lng: 124.123983 }), [])
    // const center = useMemo(() => ({ lat: 13.143966, lng: 123.725869 }), [])
    // const [mapref, setMapRef] = React.useState(null)

    const searchRef = useRef()
    const [searchBox, setSearchBox] = useState(null)
    const onSBLoad = (ref) => {
        setSearchBox(ref)
    }
    const createUnitCtx = useContext(CreateUnitContext);

    if (!isLoaded) return <div>Loading...</div>

    // const handleOnLoad = (map) => {
    //     setMapRef(map)
    // }

    const addressChangeHandler = (event) => {
        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            address: event.target.value
        })
    }

    const handleBoundsChanged = () => {
        if (mapRef) {
            onChangeCoords({
                lat: mapRef.getCenter().lat(),
                lng: mapRef.getCenter().lng(),
            })
        }
    }

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces()
        if (places.length === 0) return
        // Handle the selected place(s) here
        // console.log(places)
        onChangeCoords({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
        })
        onChangeCenter({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
        })
    }

    return (
        <div className={styles['container']}>
            {/* <div className={styles['centerMarker2']}></div> */}
            <div style={{ marginBottom: '10px', paddingInline: '10px' }}>
                <StandaloneSearchBox
                    // onLoad={(ref) => (searchBox = ref)}
                    ref={searchRef}
                    onPlacesChanged={onPlacesChanged}
                    onLoad={onSBLoad}
                >
                    <SearchField placeholder="Search" onChange={addressChangeHandler} />
                </StandaloneSearchBox>
            </div>

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
                onLoad={onMapLoad}
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
