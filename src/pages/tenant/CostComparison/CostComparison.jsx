import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { FiChevronLeft, FiAlertCircle } from 'react-icons/fi'
import { TbPencilMinus } from 'react-icons/tb'

import styles from './CostComparison.module.css'

import useUnitManager from '../../../hooks/data/units-hook'
import CostComparisonUnit from './CostComparisonUnit'
import ComparisonToolContext from '../../../context/comparison-tool-context'
import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'
import UnitSelection from './UnitSelection'
import PrimaryButton from '../../../components/Button/PrimaryButton'

const CostComparison = (props) => {
    const cctool = useContext(ComparisonToolContext)
    const { selectedUnits, total, month, handleSelectUnits } = cctool

    const navigate = useNavigate()
    const { fetchUnits, isLoading } = useUnitManager()

    const [favorites, setFavorites] = useState([])

    const [expenses, setExpenses] = useState(0)
    const [open, setOpen] = useState()

    const [selectingUnit, setSelectingUnit] = useState(selectedUnits ?? [])

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setOpen(false)
    }

    const handleSaveUnits = () => {
        handleSelectUnits(selectingUnit)
        handleCloseDrawer()
    }
    useEffect(() => {
        const loadData = async () => {
            const res = await fetchUnits()
            setFavorites(res)
        }

        loadData()
    }, [])

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
                            <p className="title">Cost Comparison Tool</p>
                        </Box>
                        <button
                            onClick={() => {
                                toggleDrawer(true)
                            }}
                        >
                            Edit
                        </button>
                    </Toolbar>
                    <div className={styles['header-container']}>
                        <h2>Expenditures</h2>
                        {expenses > 0 ? (
                            <div className={styles['choose-unit-button']}>
                                <span>
                                    <TbPencilMinus
                                        size={'24px'}
                                        style={{
                                            fill: 'transparent',
                                            color: 'var(--fc-body)',
                                        }}
                                    />
                                </span>
                                <p>Input information to compute</p>
                            </div>
                        ) : (
                            <div
                                className={styles['choose-unit-button-active']}
                            >
                                <span>PHP</span>
                                <div className={styles['price-wrapper']}>
                                    {/* <h2>10,478.00</h2> */}
                                    <h2>
                                        {total.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </h2>
                                </div>
                                <div>
                                    <Link to="edit" className="static">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </AppBar>
            </Box>
            <div className={styles['content-container']}>
                <div className={styles['units-container']}>
                    {favorites.length > 0 ? (
                        favorites
                            .filter((fav) => selectedUnits.includes(fav.id))
                            .map((unit, index) => {
                                return (
                                    <CostComparisonUnit
                                        unit={unit}
                                        key={index}
                                        month={month}
                                    />
                                )
                            })
                    ) : (
                        <h2>No units selected.</h2>
                    )}
                </div>
            </div>
            <SwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
                title={`Select units to compare (${selectingUnit.length}/5)`}
                action={
                    <div className={styles['select-units-action']}>
                        <PrimaryButton width="100%" onClick={handleSaveUnits}>
                            Save
                        </PrimaryButton>
                    </div>
                }
            >
                <div className={styles['select-units-container']}>
                    <div className={styles['select-units']}>
                        {favorites.length > 0 ? (
                            favorites.map((fav, index) => (
                                <UnitSelection
                                    key={index}
                                    unit={fav}
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

export default CostComparison
