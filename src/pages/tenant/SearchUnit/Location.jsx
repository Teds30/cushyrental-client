import { Fragment, useRef, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import LocationDropdown from './LocationDropdown'
import CardPlain from '../../../components/Card/CardPlain'
import ChipOutlined from '../../../components/Chips/ChipOutlined'
import RadiusChip from './RadiusChip'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import Map from './Map'

import styles from './SearchUnit.module.css'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { BsMap } from 'react-icons/bs'
import { TbMapPin } from 'react-icons/tb'
import { FaUniversity } from 'react-icons/fa'

import {
    LoadScript,
    StandaloneSearchBox,
    useLoadScript,
    useJsApiLoader,
} from '@react-google-maps/api'

import SearchField from '../../../components/Search/SearchField'

const lib = ['places']

const locations = [
    {
        id: 1,
        name: 'Location',
        fixedIcon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-location"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                color="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
        ),
    },
    {
        id: 2,
        name: 'Institution',
        fixedIcon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-school"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                color="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
            </svg>
        ),
    },
]

const radiusList = [
    {
        id: 1,
        name: '500 meters',
    },
    {
        id: 2,
        name: '1 kilometer',
    },
    {
        id: 3,
        name: '2 kilometer',
    },
]

const Location = (props) => {
    const {
        mapref,
        setMapRef,
        radius,
        setRadius,
        searchType,
        setSearchType,
        coordinates,
        setCoordinates,
        location,
        setLocation,
        universities,
    } = props

    const [locationZone, setLocationZone] = useState()

    const [isMapOpen, setIsMapOpen] = useState(false)

    const searchRef = useRef()
    const [searchBox, setSearchBox] = useState(null)
    const onSBLoad = (ref) => {
        setSearchBox(ref)
    }

    const handleChangeLocation = (event) => {
        setLocation(event.target.value)
    }

    const locationHandler = (value) => {
        setSearchType(value[0])
    }

    const radiusHandler = (value) => {
        setRadius(value[0])
    }

    const mapHandler = () => {
        if (isMapOpen) {
            setIsMapOpen(false)
        } else {
            setIsMapOpen(true)
        }
    }

    const locationZoneHandler = (value) => {
        setLocationZone(value[0])
    }

    const cardStyle = {
        display: 'flex',
        flexDirection: 'columns',
        gap: '12px',
    }

    const mapOpenStyles = isMapOpen
        ? { paddingInline: '0px' }
        : { paddingInline: '12px' }

    const mapCardOpenStyles = isMapOpen
        ? { ...cardStyle, padding: '0px' }
        : { ...cardStyle }

    const handleChangeCenter = (coords) => {
        // console.log(coords)
        setCoordinates(coords)
    }

    const handleChangeCoords = (coords) => {
        setCoordinates(coords)
    }

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces()
        if (places.length === 0) return

        // Handle the selected place(s) here
        handleChangeCoords({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
        })
    }

    const handleOnLoad = (map) => {
        setMapRef(map)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
        libraries: lib,
        onLoad: handleOnLoad,
    })

    return (
        <div className={`${styles['location-main']}`}>
            {isLoaded && (
                <Fragment>
                    <div
                        className={styles['card-container']}
                        style={{ paddingInline: '12px' }}
                    >
                        <CardPlain style={{ ...cardStyle }}>
                            <p className="title" style={{ fontSize: '16px' }}>
                                Search
                            </p>

                            {searchType === 1 && (
                                <StandaloneSearchBox
                                    // onLoad={(ref) => (searchBox = ref)}
                                    ref={searchRef}
                                    onPlacesChanged={onPlacesChanged}
                                    onLoad={onSBLoad}
                                >
                                    <SearchField placeholder="Example: 'Rawis' or 'Daraga'" />
                                </StandaloneSearchBox>
                            )}
                            {searchType === 2 && (
                                <LocationDropdown
                                    searchType={searchType}
                                    universities={universities}
                                    location={location}
                                    onChangeLocation={handleChangeLocation}
                                />
                            )}

                            <div className={`${styles['location-button']}`}>
                                <ChipOutlined
                                    items={locations}
                                    button="radio"
                                    selected={[searchType]}
                                    onChipValue={locationHandler}
                                />
                            </div>
                        </CardPlain>
                    </div>

                    <div
                        className={styles['card-container']}
                        style={{ paddingInline: '12px' }}
                    >
                        <CardPlain style={{ ...cardStyle }}>
                            <p className="title" style={{ fontSize: '16px' }}>
                                Radius
                            </p>

                            <div className={`${styles['hr']}`}></div>

                            <div className={`${styles['location-button']}`}>
                                <RadiusChip
                                    items={radiusList}
                                    button="radio"
                                    selected={[radius]}
                                    onChipValue={radiusHandler}
                                />
                            </div>
                        </CardPlain>
                    </div>
                    <div
                        className={styles['card-container']}
                        style={mapOpenStyles}
                    >
                        <CardPlain
                            style={{
                                ...mapCardOpenStyles,
                                paddingInline: '0px',
                            }}
                        >
                            <Accordion
                                sx={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'rgba(255, 255, 255, 0.80)',
                                    boxShadow: 'none',
                                    padding: '0',
                                }}
                            >
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{
                                        padding: '0',
                                        '& MuiAccordionSummary-content': {
                                            padding: '0',
                                            margin: '0',
                                        },
                                    }}
                                    onClick={mapHandler}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'start',
                                        alignItems: 'flex-start',
                                        paddingInline: '12px',
                                    }}
                                >
                                    <p
                                        className="title"
                                        style={{
                                            fontSize: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <BsMap />
                                        <span>Map</span>
                                    </p>

                                    <div className={`${styles['hr']}`}></div>
                                    {/* <div
                                className={`${styles['map-title']}`}
                                style={{ paddingInline: '12px' }}
                            >
                                <BsMap />
                                <p className="title"> Map</p>
                            </div> */}
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{ padding: isMapOpen && '0' }}
                                >
                                    <div
                                        className={`${styles['location-map']}`}
                                    >
                                        <div
                                            className={`${styles['hr']}`}
                                        ></div>

                                        <Map
                                            mapref={mapref}
                                            setMapRef={setMapRef}
                                            radius={radius}
                                            location={location}
                                            coordinates={coordinates}
                                            onMapLoad={handleOnLoad}
                                            // setCoordinates={setCoordinates}
                                            searchType={searchType}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </CardPlain>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default Location
