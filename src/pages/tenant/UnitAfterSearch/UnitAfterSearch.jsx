import React, { useState, useEffect } from 'react'
import { Link, navigate, useLocation, useNavigate } from 'react-router-dom'
import { StyledTabs, StyledTab, TabPanel } from '../../../components/Tabs/Tabs'
import styles from './UnitAfterSearch.module.css'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import ListAfterSearch from './ListAfterSearch'
import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'
import UnitOption from './UnitOption'
import UnitNoFound from './UnitNoFound'

import { FiChevronLeft } from 'react-icons/fi'
import { CgOptions } from 'react-icons/cg'
import MapAfterSearch from './MapAfterSearch'
import { setKey, geocode, RequestType } from 'react-geocode'

const UnitAfterSearch = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const receivedData = location.state
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState()
    const [units, setUnits] = useState([])
    const [address, setAddress] = useState('')

    const [sortOption, setSortOption] = useState('')
    const [unitOptionVisible, setUnitOptionVisible] = useState(false)

    // console.log(units);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setOpen(false)
    }

    useEffect(() => {
        const fetchUnits = async () => {
            setUnits(receivedData.units)
            setKey(import.meta.env.VITE_GOOGLE_MAP_API)
            let address

            await geocode(
                RequestType.LATLNG,
                `${receivedData.location.lat},${receivedData.location.lng}`
            )
                .then(({ results }) => {
                    const address_components = results[0].address_components
                    let premise
                    let plus_code
                    let street
                    let city

                    address_components.forEach((component) => {
                        if (component.types.includes('route')) {
                            street = component.long_name
                        } else if (component.types.includes('locality')) {
                            city = component.long_name
                        } else if (component.types.includes('plus_code')) {
                            plus_code = component.long_name
                        } else if (component.types.includes('premise')) {
                            premise = component.long_name
                        }
                    })
                    setAddress(
                        `${premise ?? street ?? plus_code ?? ''}, ${city}`
                    )
                    address = `${address_components[0].long_name} ${address_components[1].long_name}`
                })
                .catch(console.error)
        }
        fetchUnits()
    }, [])

    const handlesortUnits = (sortingOption) => {
        setSortOption(sortingOption)

        if (sortingOption === 'nearest') {
            setUnits([...units].sort((a, b) => a.distance - b.distance))
        } else if (sortingOption === 'priceHighLow') {
            setUnits([...units].sort((a, b) => b.price - a.price))
        } else if (sortingOption === 'priceLowHigh') {
            setUnits([...units].sort((a, b) => a.price - b.price))
        }

        console.log('asd')
        setOpen(false)
        setUnitOptionVisible(!unitOptionVisible)
    }

    return (
        <div className={`${styles['main-container']} `}>
            <Box className={`${styles['top-back-container']} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: '#fff',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                        <Link
                            to=""
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }}
                        >
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
                        <Box
                            sx={{ flexGrow: 1, alignItems: 'center' }}
                            className={styles['title-container']}
                        >
                            <p className="title">Boarding Houses</p>

                            <div className={`${styles['location-container']}`}>
                                <p className="smaller-text">
                                    {address} (
                                    {receivedData.radius === 1
                                        ? '500m'
                                        : receivedData.radius === 2
                                        ? '1km'
                                        : receivedData.radius === 3
                                        ? '2km'
                                        : '500m'}{' '}
                                    radius)
                                </p>
                                {/* <span className="smaller-text">
                                    ({receivedData.radius} radius)
                                </span> */}
                            </div>
                        </Box>
                        {value === 0 && units.length > 0 && (
                            <button
                                className={`${styles['option-button']} `}
                                onClick={toggleDrawer(true)}
                            >
                                <CgOptions />
                            </button>
                        )}
                    </Toolbar>

                    <Box
                        className={styles['filter']}
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            sx={{ display: 'flex', flex: 1, gap: '0' }}
                        >
                            <StyledTab
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    flex: 1,
                                    maxWidth: '100%',
                                    margin: '0',
                                }}
                                label="Lists"
                            />

                            <StyledTab
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    flex: 1,
                                    maxWidth: '100%',
                                    margin: '0',
                                }}
                                label="Map"
                            />
                        </StyledTabs>
                    </Box>
                </AppBar>
            </Box>

            {value === 0 ? (
                units.length === 0 ? (
                    <UnitNoFound />
                ) : (
                    <TabPanel value={value} index={0}>
                        <ListAfterSearch units={units} />
                    </TabPanel>
                )
            ) : (
                <TabPanel value={value} index={1}>
                    <MapAfterSearch
                        center={receivedData.location}
                        radius={receivedData.radius}
                        units={units}
                    />
                </TabPanel>
            )}
            <SwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
                title="Sort"
            >
                {' '}
                <div style={{ padding: '0 20px' }}>
                    <div className={`${styles['main-swipe-container']}`}>
                        {/* <div className={`${styles['top-swipe-container']}`}>
                            <div>
                                <p className="title">Sort</p>
                            </div>
                        </div> */}
                        <div className={`${styles['swipe-content-container']}`}>
                            <UnitOption
                                onSortChange={handlesortUnits}
                                sortOption={sortOption}
                            />
                        </div>
                    </div>
                </div>
            </SwipeableCard>
        </div>
    )
}

export default UnitAfterSearch
