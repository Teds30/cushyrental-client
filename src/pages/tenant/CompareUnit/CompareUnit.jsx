import React, { Fragment, useContext, useEffect, useState } from 'react'
import CompareUnitContext from '../../../context/compareunit-context'

import styles from './CompareUnit.module.css'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { FiChevronLeft } from 'react-icons/fi'
import { TbHomePlus } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa6'

import PrimaryButton from '../../../components/Button/PrimaryButton'
import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'

import useBookmark from '../../../hooks/data/bookmark-hook'
import AuthContext from '../../../context/auth-context'
import CompareUnitSelection from './CompareUnitSelection'
import UnitComparing from './UnitComparing'
import CompareUnitPrice from './Details/CompareUnitPrice'
import CompareAmenities from './Details/CompareAmenities'
import CompareFacilities from './Details/CompareFacilities'
import CompareInclusions from './Details/CompareInclusions'
import CompareRules from './Details/CompareRules'
import CompareLocation from './Details/CompareLocation'
import CompareRating from './Details/CompareRating'

const CompareUnit = () => {
    const cu_tool = useContext(CompareUnitContext)

    const { selectedUnits, handleSelectUnits } = cu_tool

    const navigate = useNavigate()
    const { fetchBookmarkUnits, isLoading } = useBookmark()
    const authCtx = useContext(AuthContext)

    const [favorites, setFavorites] = useState([])

    const [open, setOpen] = useState()

    const [selectingUnit, setSelectingUnit] = useState(null)

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setOpen(false)
    }

    const handleSaveUnits = () => {
        handleSelectUnits(selectingUnit)
        setSelectingUnit(null)
        handleCloseDrawer()
    }
    useEffect(() => {
        const loadData = async () => {
            const res = await fetchBookmarkUnits(authCtx.user.id)
            setFavorites(res)
        }

        if (authCtx.user) loadData()
    }, [authCtx.user])

    return (
        <div className={styles['container']}>
            <Box className={`${styles['top-back-container']} `}>
                <AppBar
                    position="fixed"
                    sx={{
                        margin: 0,
                        backgroundColor: '#fff',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                        borderBottom: '1px solid var(--border-color)',
                    }}
                >
                    <Toolbar className={`${styles['toolbar-container']}`}>
                        <Link
                            to={`/`}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }}
                            className={`${styles['link-button']}`}
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
                            sx={{
                                marginLeft: '-24px',
                                display: 'flex',
                                justifyContent: 'center',
                                flex: '1',
                            }}
                        >
                            <p className="title">Unit Comparison</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={styles['content-container']}>
                <div className={styles['add-container']}>
                    <PrimaryButton
                        rounded={true}
                        leftIcon={<FaPlus />}
                        onClick={() => {
                            toggleDrawer(true)
                        }}
                        disabled={selectedUnits.length >= 3}
                    >
                        Add a unit
                    </PrimaryButton>
                    <p>Maximum of 3 comparing units</p>
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                    }}
                >
                    {selectedUnits.length > 0 && (
                        <div className={styles['content']}>
                            <UnitComparing />
                            <CompareUnitPrice selectedUnits={selectedUnits} />
                            <CompareAmenities selectedUnits={selectedUnits} />
                            <CompareFacilities selectedUnits={selectedUnits} />
                            <CompareInclusions selectedUnits={selectedUnits} />
                            <CompareRules selectedUnits={selectedUnits} />
                            <CompareLocation selectedUnits={selectedUnits} />
                            <CompareRating selectedUnits={selectedUnits} />
                        </div>
                    )}
                </Box>
            </div>

            <SwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
                title={`Select unit to compare`}
                action={
                    <div className={styles['select-units-action']}>
                        <PrimaryButton
                            width="100%"
                            onClick={handleSaveUnits}
                            disabled={!selectingUnit}
                        >
                            Save
                        </PrimaryButton>
                    </div>
                }
            >
                <div className={styles['select-units-container']}>
                    <div className={styles['select-units']}>
                        {favorites.length > 0 ? (
                            favorites.map((fav, index) => (
                                <CompareUnitSelection
                                    key={index}
                                    unit={fav}
                                    selectedUnits={selectedUnits}
                                    selectingUnit={selectingUnit}
                                    setSelectingUnit={setSelectingUnit}
                                />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>
                                No units found.
                            </p>
                        )}
                    </div>
                </div>
            </SwipeableCard>
        </div>
    )
}

export default CompareUnit
