import { useState } from 'react'
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

const locations = [
    {
        id: 1,
        name: 'Location',
        fixedIcon: (
            <TbMapPin
                style={{
                    fill: 'transparent',
                    color: 'inherit',
                }}
            />
        ),
    },
    {
        id: 2,
        name: 'Institution',
        fixedIcon: <FaUniversity />,
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

    // searchType === 2
    //     ? universities[0]
    //     : {
    //           lat: 13.143966,
    //           lng: 123.725869,
    //       }

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
        // code here...
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

    return (
        <div className={`${styles['location-main']}`}>
            <div
                className={styles['card-container']}
                style={{ paddingInline: '12px' }}
            >
                <CardPlain style={{ ...cardStyle }}>
                    <p className="title" style={{ fontSize: '16px' }}>
                        Search
                    </p>
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
            <div className={styles['card-container']} style={mapOpenStyles}>
                <CardPlain
                    style={{ ...mapCardOpenStyles, paddingInline: '0px' }}
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
                        <AccordionDetails sx={isMapOpen && { padding: '0' }}>
                            <div className={`${styles['location-map']}`}>
                                <div className={`${styles['hr']}`}></div>

                                <Map
                                    mapref={mapref}
                                    setMapRef={setMapRef}
                                    radius={radius}
                                    location={location}
                                    coordinates={coordinates}
                                    // setCoordinates={setCoordinates}
                                    searchType={searchType}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </CardPlain>
            </div>
        </div>
    )
}

export default Location
