import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { FiChevronLeft, FiAlertCircle } from 'react-icons/fi'
import { TbPencilMinus, TbHomePlus, TbHomeUp, TbHomeEdit } from 'react-icons/tb'
import { BsFillHouseUpFill, BsHouseUp } from 'react-icons/bs'

import styles from './CostComparison.module.css'

import useUnitManager from '../../../hooks/data/units-hook'
import CostComparisonUnit from './CostComparisonUnit'
import ComparisonToolContext from '../../../context/comparison-tool-context'
import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'
import UnitSelection from './UnitSelection'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import FloatingActionButton from '../../../components/Button/FloatingActionButton'
import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'

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
                    </Toolbar>
                    {selectedUnits.length > 0 && (
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
                                    className={
                                        styles['choose-unit-button-active']
                                    }
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
                    )}
                </AppBar>
            </Box>
            <div className={styles['content-container']}>
                <div
                    className={styles['units-container']}
                    style={{
                        marginTop: selectedUnits.length > 0 ? '200px' : '100px',
                    }}
                >
                    {selectedUnits.length > 0 && favorites.length > 0 ? (
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
                    ) : !isLoading ? (
                        <div className={styles['no-units']}>
                            <span className={styles['no-units-icon']}>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.2228 13.8137H5.6228V15.3375H11.2228V17.6232L14.4228 14.5756L11.2228 11.528V13.8137ZM16.0228 13.0518V10.7661H21.6228V9.24224H16.0228V6.95653L12.8228 10.0041L16.0228 13.0518Z"
                                        fill="var(--accent)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.2921 27.6676C10.2921 29.0677 9.02801 29.0933 9.02801 29.0933H6.37461C6.37461 29.0933 0 28.674 0 23.1065V11.0503C0 11.0503 -0.0068121 9.49152 3.23162 7.23223C3.37861 7.09609 12.1761 0.51644 12.1761 0.51644C12.1761 0.51644 13.674 -0.64555 15.4446 0.51644C17.2152 1.67843 24.0092 7.23223 24.0092 7.23223L22.7433 8.78066L22.7431 8.7805L22.7423 8.77981L22.7387 8.77691L22.7244 8.76524L22.6679 8.71909L22.4507 8.54202C22.2625 8.38871 21.9914 8.16819 21.6604 7.89985C20.9982 7.36298 20.0976 6.63562 19.1425 5.87267C17.1882 4.31143 15.135 2.70551 14.3473 2.18852C14.0001 1.96065 13.7706 1.9871 13.6201 2.02379C13.523 2.04744 13.441 2.08425 13.3881 2.11282C13.374 2.12043 13.3637 2.12657 13.3574 2.1304L13.3487 2.13689L13.2752 2.1919L12.9958 2.40087L11.9975 3.14787C11.1707 3.7667 10.0667 4.59313 8.95833 5.42376C7.8497 6.25455 6.73743 7.08887 5.89351 7.72372C5.47129 8.04134 5.11782 8.30784 4.86604 8.49862C4.73974 8.59433 4.64168 8.66897 4.57424 8.72075L4.53546 8.75066L4.48926 8.79345L4.37595 8.8725C2.92991 9.88133 2.34216 10.641 2.11657 11.0172C2.06007 11.1114 2.02544 11.1828 2.00507 11.2301L2 11.242V23.1065C2 24.9112 2.94187 25.8261 4.08527 26.4007C4.68385 26.7014 5.30533 26.8812 5.79213 26.984C6.03108 27.0345 6.22632 27.0642 6.35494 27.0807C6.39993 27.0864 6.43634 27.0905 6.46315 27.0933H8.29206V23.1152C8.28771 22.5251 8.42107 21.9462 8.72838 21.4322C9.03562 20.9182 9.4485 20.583 9.82802 20.3739C10.196 20.1712 10.5434 20.0796 10.7837 20.0357C10.9082 20.0129 11.017 20.0006 11.1032 19.9938C11.1467 19.9904 11.1855 19.9883 11.2188 19.9871L11.2443 19.9863L11.265 19.9859L11.2852 19.9856L11.2945 19.9855L11.299 19.9855L11.3012 19.9855C11.3022 19.9855 11.3033 19.9855 11.3033 21.9749V19.9855H15.5718C15.2708 20.6163 15.0386 21.2862 14.8847 21.9855H11.3033C11.3033 21.9855 10.2801 21.9855 10.2921 23.1065V27.6676ZM27.3733 15.2949V11.0503C27.3733 11.0503 27.3051 9.49164 24.0092 7.23223L22.7434 8.78069L22.8087 8.83411L22.8783 8.88184C24.3588 9.89675 24.9886 10.6686 25.2414 11.0647C25.3074 11.1681 25.3487 11.2472 25.3733 11.3003V14.767C26.0678 14.8694 26.7375 15.0483 27.3733 15.2949ZM12.2275 0.585212C13.3329 2.06327 13.3724 2.11612 13.3738 2.11805L13.3739 2.11798L12.2275 0.585212Z"
                                        fill="var(--accent)"
                                    />
                                    <circle
                                        cx="24"
                                        cy="24"
                                        r="7"
                                        fill="transparent"
                                        stroke="var(--accent)"
                                        stroke-width="1.4"
                                    />
                                    <path
                                        d="M20 26.3328V27C20 27.5516 21.3438 28 23 28C24.6562 28 26 27.5516 26 27V26.3328C25.3547 26.7875 24.175 27 23 27C21.825 27 20.6453 26.7875 20 26.3328ZM25 22C26.6562 22 28 21.5516 28 21C28 20.4484 26.6562 20 25 20C23.3438 20 22 20.4484 22 21C22 21.5516 23.3438 22 25 22ZM20 24.6937V25.5C20 26.0516 21.3438 26.5 23 26.5C24.6562 26.5 26 26.0516 26 25.5V24.6937C25.3547 25.225 24.1734 25.5 23 25.5C21.8266 25.5 20.6453 25.225 20 24.6937ZM26.5 24.8656C27.3953 24.6922 28 24.3703 28 24V23.3328C27.6375 23.5891 27.1047 23.7641 26.5 23.8719V24.8656ZM23 22.5C21.3438 22.5 20 23.0594 20 23.75C20 24.4406 21.3438 25 23 25C24.6562 25 26 24.4406 26 23.75C26 23.0594 24.6562 22.5 23 22.5ZM26.4266 23.3797C27.3641 23.2109 28 22.8797 28 22.5V21.8328C27.4453 22.225 26.4922 22.4359 25.4891 22.4859C25.95 22.7094 26.2891 23.0094 26.4266 23.3797Z"
                                        fill="var(--accent)"
                                    />
                                </svg>
                            </span>
                            <p className="title">No units selected</p>
                            <p>Start comparing expenses by selecting units</p>
                            <Box sx={{ marginTop: '12px' }}>
                                <PrimaryButton onClick={toggleDrawer}>
                                    Get Started
                                </PrimaryButton>
                            </Box>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            {selectedUnits.length > 0 && (
                <FloatingActionButton
                    onClick={() => {
                        toggleDrawer(true)
                    }}
                >
                    <TbHomeEdit
                        size={'24px'}
                        style={{ fill: 'transparent', color: 'white' }}
                    />
                </FloatingActionButton>
            )}

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
