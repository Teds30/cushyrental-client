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
import useBookmark from '../../../hooks/data/bookmark-hook'

import AuthContext from '../../../context/auth-context'

const CostComparison = (props) => {
    const cctool = useContext(ComparisonToolContext)

    const { selectedUnits, total, month, handleSelectUnits } = cctool

    const navigate = useNavigate()
    const { fetchBookmarkUnits, isLoading } = useBookmark()
    const authCtx = useContext(AuthContext)

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
                                    width="48"
                                    height="48"
                                    viewBox="0 0 60 64"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.4456 27.6273H11.2456V30.675H22.4456V35.2464L28.8456 29.1512L22.4456 23.0559V27.6273ZM32.0456 26.1035V21.5321H43.2456V18.4845H32.0456V13.9131L25.6456 20.0083L32.0456 26.1035Z"
                                        fill="var(--accent)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.5841 55.3351C20.5841 58.1354 18.056 58.1867 18.056 58.1867H12.7492C12.7492 58.1867 0 57.3481 0 46.213V22.1006C0 22.1006 -0.0136242 18.983 6.46323 14.4645C6.75721 14.1922 24.3521 1.03288 24.3521 1.03288C26.0811 3.34466 26.1463 3.43192 26.1486 3.4353L26.1488 3.43517L24.3521 1.03288C24.3521 1.03288 27.3481 -1.2911 30.8892 1.03288C34.4304 3.35686 48.0183 14.4645 48.0183 14.4645C46.1196 16.7872 46.1196 16.7871 46.1195 16.7871L46.1191 16.7867L46.1174 16.7853L46.1102 16.7795L46.0815 16.756L45.9681 16.6634C45.8684 16.5821 45.7214 16.4622 45.533 16.3087C45.156 16.0017 44.6132 15.5601 43.9506 15.0229C42.625 13.9482 40.8217 12.4919 38.9092 10.9641C35.0179 7.85534 30.8675 4.60698 29.2432 3.54099C28.2798 2.9087 27.5269 2.94837 27.0033 3.07603C26.7088 3.14782 26.4645 3.25751 26.3011 3.34574C26.2218 3.38856 26.1692 3.42225 26.1477 3.43653L26.144 3.43896L26.1362 3.44481L26.0985 3.473L25.9514 3.58303L25.3926 4.00102L23.3959 5.49512C21.742 6.73285 19.534 8.38586 17.317 10.0473C15.0996 11.7089 12.8745 13.378 11.1859 14.6483C10.3412 15.2837 9.63311 15.8176 9.12814 16.2002C8.87503 16.392 8.67692 16.5428 8.5395 16.6483C8.48375 16.6911 8.44618 16.7203 8.42288 16.7385L8.3497 16.8063L8.17973 16.9249C5.20107 19.0029 3.91548 20.6198 3.37555 21.52C3.13127 21.9273 3.03433 22.1963 3 22.3097V46.213C3 50.3119 5.20963 52.4327 7.72155 53.6949C9.01784 54.3462 10.3485 54.729 11.3775 54.9465C11.8853 55.0538 12.3027 55.1173 12.5828 55.1532C12.7129 55.1699 12.8123 55.1805 12.8761 55.1867H17.5841V46.2267C17.576 45.2015 17.8067 44.2277 18.3151 43.3774C18.8231 42.5278 19.5058 41.9724 20.1386 41.6237C20.7541 41.2846 21.3391 41.1297 21.7474 41.055C21.9581 41.0165 22.1412 40.9958 22.2845 40.9845C22.3567 40.9789 22.4204 40.9755 22.4741 40.9736C22.5011 40.9726 22.5257 40.9719 22.5477 40.9715L22.5791 40.9711L22.5933 40.971L22.6001 40.971L22.6034 40.971C22.605 40.971 22.6066 40.971 22.6066 43.9604V40.971H30.7021C30.3106 41.9336 29.9971 42.9362 29.7694 43.971H22.6066C22.6066 43.971 20.5601 43.971 20.5841 46.213V55.3351ZM54.7467 30.5898V22.1006C54.7467 22.1006 54.6102 18.9833 48.0183 14.4645L46.1196 16.7872L46.2176 16.8673L46.3221 16.9389C49.3668 19.0261 50.7319 20.6611 51.3258 21.5913C51.5821 21.9929 51.6985 22.2687 51.7467 22.403V29.7094C52.7803 29.92 53.7829 30.216 54.7467 30.5898ZM17.5693 55.5169C17.5691 55.5174 17.5691 55.5176 17.5691 55.5176C17.5692 55.5177 17.5696 55.5162 17.5703 55.5132C17.5698 55.5149 17.5694 55.5162 17.5693 55.5169ZM12.9575 55.1939C12.9584 55.194 12.9563 55.1938 12.9515 55.1934L12.954 55.1937L12.9575 55.1939Z"
                                        fill="var(--accent)"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="14.5"
                                        fill="transparent"
                                        stroke="var(--accent)"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M40 52.6656V54C40 55.1031 42.6875 56 46 56C49.3125 56 52 55.1031 52 54V52.6656C50.7094 53.575 48.35 54 46 54C43.65 54 41.2906 53.575 40 52.6656ZM50 44C53.3125 44 56 43.1031 56 42C56 40.8969 53.3125 40 50 40C46.6875 40 44 40.8969 44 42C44 43.1031 46.6875 44 50 44ZM40 49.3875V51C40 52.1031 42.6875 53 46 53C49.3125 53 52 52.1031 52 51V49.3875C50.7094 50.45 48.3469 51 46 51C43.6531 51 41.2906 50.45 40 49.3875ZM53 49.7312C54.7906 49.3844 56 48.7406 56 48V46.6656C55.275 47.1781 54.2094 47.5281 53 47.7438V49.7312ZM46 45C42.6875 45 40 46.1187 40 47.5C40 48.8813 42.6875 50 46 50C49.3125 50 52 48.8813 52 47.5C52 46.1187 49.3125 45 46 45ZM52.8531 46.7594C54.7281 46.4219 56 45.7594 56 45V43.6656C54.8906 44.45 52.9844 44.8719 50.9781 44.9719C51.9 45.4188 52.5781 46.0188 52.8531 46.7594Z"
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
