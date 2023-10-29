import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { StyledTabs, StyledTab, TabPanel } from '../../../components/Tabs/Tabs'
import Location from './Location'
import useAttributeManager from '../../../hooks/data/attribute-hook'

import useUnitManager from '../../../hooks/data/units-hook'

import styles from './SearchUnit.module.css'
import CancelIcon from '@mui/icons-material/Cancel'
import Filter from './Filter'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import { useNavigate } from 'react-router-dom'

const universities = [
    {
        id: 1,
        name: 'Bicol University Main Campus',
        location: {
            lat: 13.144297,
            lng: 123.725128,
        },
        icon: 'BU_Main.png',
    },
    {
        id: 2,
        name: 'University of Santo Tomas Legazpi',
        location: {
            lat: 13.1645849,
            lng: 123.7510655,
        },
        icon: 'ustl.png',
    },
    {
        id: 3,
        name: 'Divine Word College Legazpi',
        location: {
            lat: 13.138219,
            lng: 123.735674,
        },
        icon: 'DWCL.png',
    },
]

const SearchUnit = () => {
    const navigate = useNavigate()
    const { fetchAttributes, isLoading } = useAttributeManager()
    const { searchUnits } = useUnitManager()
    const [value, setValue] = useState(0)
    const [attribtes, setAttributes] = useState([])

    const [filters, setFilters] = useState([])
    const [radius, setRadius] = useState(1)
    const [mapref, setMapRef] = useState(null)
    const [coordinates, setCoordinates] = useState({
        lat: 13.143966,
        lng: 123.725869,
    })
    const [location, setLocation] = useState()

    const [searchType, setSearchType] = useState(1)

    useEffect(() => {
        const newLocation =
            searchType === 2
                ? universities[0]
                : {
                      lat: 13.143966,
                      lng: 123.725869,
                  }

        setLocation(newLocation)
    }, [searchType])
    if (mapref) {
        // console.log({
        //     lat: mapref.getCenter().lat(),
        //     lng: mapref.getCenter().lng(),
        // })
    } else {
        console.log('no')
    }

    useEffect(() => {
        if (mapref) {
            setCoordinates({
                lat: mapref.getCenter().lat(),
                lng: mapref.getCenter().lng(),
            })
        }
    }, [value])

    const submitSearch = () => {
        const sendSearch = async () => {
            const res = await searchUnits({
                location: {
                    lat: mapref.getCenter().lat(),
                    lng: mapref.getCenter().lng(),
                },
                radius:
                    radius === 1
                        ? '.5'
                        : radius === 2
                        ? '1'
                        : radius === 3
                        ? '2'
                        : '.5',
                filters: filters,
            })
            console.log(res.units)
            navigate('/unitaftersearch', {
                state: {
                    location: {
                        lat: mapref.getCenter().lat(),
                        lng: mapref.getCenter().lng(),
                    },
                    radius: radius,
                    units: res.units,
                },
            })
        }

        sendSearch()
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const closeSearchHandler = () => {
        // code here...
        navigate('/')
    }

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const res = await fetchAttributes()
                setAttributes(res)
            } catch (error) {}
        }

        fetchImagesData()
    }, [])

    const style = {
        textTransform: 'none',
        fontWeight: '600',
        fontSize: '14px',
        letterSpacing: '0',
    }

    return (
        !isLoading &&
        attribtes.length !== 0 && (
            <div className={`${styles['search-container']}`}>
                <Box
                    className={`${styles['search-nav']}`}
                    sx={{
                        // borderBottom: 1,
                        borderColor: 'divider',
                        background: 'var(--bg-layer1)',
                    }}
                >
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <StyledTab disableRipple sx={style} label="Location" />

                        <StyledTab disableRipple sx={style} label="Filter" />
                    </StyledTabs>

                    <div className={`${styles['close-button']}`}>
                        <IconButton
                            aria-label="delete"
                            onClick={closeSearchHandler}
                        >
                            <CancelIcon
                                sx={{
                                    filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25))',
                                    fill: 'var(--bg-layer1)',
                                }}
                            />
                        </IconButton>
                    </div>
                </Box>
                <TabPanel value={value} index={0}>
                    <Location
                        mapref={mapref}
                        coordinates={coordinates}
                        // setCoordinates={setCoordinates}
                        setMapRef={setMapRef}
                        radius={radius}
                        setRadius={setRadius}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        location={location}
                        setLocation={setLocation}
                        universities={universities}
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Filter
                        setFilters={setFilters}
                        filters={filters}
                        attributes={attribtes}
                    />
                </TabPanel>

                <div className={`${styles['search-button']}`}>
                    <PrimaryButton onClick={submitSearch} width="100%">
                        Search
                    </PrimaryButton>
                </div>
            </div>
        )
    )
}

export default SearchUnit
