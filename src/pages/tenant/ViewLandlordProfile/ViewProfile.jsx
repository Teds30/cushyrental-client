import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import styles from './ViewProfile.module.css'
import { FiChevronLeft } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa6'
import { TbSortDescending, TbSortAscending } from 'react-icons/tb'
import { BiSolidBadgeCheck } from 'react-icons/bi'
import LandlordProfileImage from './LandlordProfileImage'
import LandlordUnit from './LandlordUnit'

import useUserManager from '../../../hooks/data/users-hook'

const ViewProfile = () => {
    const { id } = useParams()
    const { fetchUser, fetchUserUnits } = useUserManager()
    const [user, setUser] = useState(null)
    const [units, setUnits] = useState([])
    const [isPriceAscending, setIsPriceAscending] = useState(false)
    const [isReviewAscending, setIsReviewAscending] = useState(false)

    const navigate = useNavigate()

    // console.log(units);
    const priceSortLabel = isPriceAscending
        ? 'Price: Low to High'
        : 'Price: High to Low'
    const reviewSortLabel = isReviewAscending
        ? 'Reviews: Low to High'
        : 'Reviews: High to Low'

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await fetchUser(id)
            setUser(data)
        }

        const fetchUnits = async () => {
            const data = await fetchUserUnits(id)
            setUnits(data)
        }

        fetchUsers()
        fetchUnits()
    }, [])

    const handlePriceSort = () => {
        setUnits((prevUnits) => {
            const sortedUnits = [...prevUnits].sort((unit1, unit2) => {
                return isPriceAscending
                    ? unit2.price - unit1.price
                    : unit1.price - unit2.price
            })
            setIsPriceAscending(!isPriceAscending)
            return sortedUnits
        })
    }
    const handleReviewSort = () => {
        setUnits((prevReviews) => {
            const sortedReviews = [...prevReviews].sort((unit1, unit2) => {
                return isReviewAscending
                    ? unit2.average_ratings - unit1.average_ratings
                    : unit1.average_ratings - unit2.average_ratings
            })
            setIsReviewAscending(!isReviewAscending)
            return sortedReviews
        })
    }

    return (
        user !== null && (
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
                            // borderBottom: "1px solid var(--border-color)",
                        }}
                    >
                        <Toolbar>
                            <Link
                                onClick={() => {
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
                            <Box sx={{ flexGrow: 1 }}>
                                <p className="title">Back</p>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>

                <div className={`${styles['profile-container']} `}>
                    <div className={`${styles['image-container']} `}>
                        <LandlordProfileImage
                            image={user !== null && user.profile_picture_img}
                        />
                    </div>
                    <div className={`${styles['profile-details-container']} `}>
                        <div className={`${styles['profile-details-name']} `}>
                            <p>
                                {user.first_name} {user.last_name}
                                {user.is_verified && (
                                    <BiSolidBadgeCheck
                                        size={20}
                                        style={{
                                            fill: 'var(--accent)',
                                            marginLeft: '3px',
                                            marginTop: '-3px',
                                        }}
                                    />
                                )}
                            </p>
                        </div>
                        <div className={`${styles['profile-details-type']} `}>
                            <p>
                                {user.user_type_id === 2
                                    ? 'Landlord'
                                    : user?.user_type_id}
                            </p>
                        </div>
                        <div className={`${styles['profile-details-rating']} `}>
                            <FaStar
                                style={{
                                    fill: '#03b077',
                                    marginTop: '-2px',
                                }}
                            />
                            <p className="caption">
                                {user.total_ratings &&
                                    user.total_ratings.toFixed(2)}
                                /5.0
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles['hr']}></div>

                <div className={`${styles['filter-container']}`}>
                    <div>
                        <button
                            className={`${styles['filter-button']}`}
                            onClick={handlePriceSort}
                        >
                            {isPriceAscending ? (
                                <TbSortAscending
                                    style={{
                                        fill: 'transparent',
                                        color: 'var(--fc-body-light)',
                                        fontSize: '20px',
                                    }}
                                />
                            ) : (
                                <TbSortDescending
                                    style={{
                                        fill: 'transparent',
                                        color: 'var(--fc-body-light)',
                                        fontSize: '20px',
                                    }}
                                />
                            )}
                            <p className="caption">
                                <span>Price:</span>{' '}
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {isPriceAscending
                                        ? 'Low to High'
                                        : 'High to Low'}
                                </span>
                            </p>
                        </button>
                    </div>
                    <div>
                        <button
                            className={`${styles['filter-button']}`}
                            onClick={handleReviewSort}
                        >
                            {isReviewAscending ? (
                                <TbSortAscending
                                    style={{
                                        fill: 'transparent',
                                        color: 'var(--fc-body-light)',
                                        fontSize: '20px',
                                    }}
                                />
                            ) : (
                                <TbSortDescending
                                    style={{
                                        fill: 'transparent',
                                        color: 'var(--fc-body-light)',
                                        fontSize: '20px',
                                    }}
                                />
                            )}
                            <p className="caption">
                                <span>Reviews:</span>{' '}
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {isReviewAscending
                                        ? 'Low to High'
                                        : 'High to Low'}
                                </span>
                            </p>
                        </button>
                    </div>
                </div>
                <div className={`${styles['main-unit-container']} `}>
                    {units.length === 0 ? (
                        <div className={`${styles['bottom-text-container']}`}>
                            <p>No units found.</p>
                        </div>
                    ) : (
                        units.map((unit) => (
                            <LandlordUnit key={unit.id} unit={unit} />
                        ))
                    )}
                </div>

                {units.length > 0 && (
                    <div className={`${styles['bottom-text-container']}`}>
                        <p>No more units found.</p>
                    </div>
                )}
            </div>
        )
    )
}

export default ViewProfile
