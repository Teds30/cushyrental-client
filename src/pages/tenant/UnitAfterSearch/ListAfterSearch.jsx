import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import styles from './UnitAfterSearch.module.css'
import IconButton from '@mui/material/IconButton'

import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { TbMapPin } from 'react-icons/tb'
import ListAfterSearchImage from './ListAfterSearchImage'
import ListAfterSearchBookmark from '../UnitAfterSearch/ListAfterSearchBookmark'

import useImageManager from '../../../hooks/data/image-hook'
import UserAvatar from '../../../components/Avatar/UserAvatar'

const ListAfterSearch = ({ units }) => {
    // const { ListAfterSearch } = props;
    const [isBookmarked, setIsBookmarked] = useState([])
    const swiperRef = useRef(null)

    // console.log(isBookmarked);

    const handleBookmarkClick = (id) => {
        if (isBookmarked.includes(id)) {
            setIsBookmarked(isBookmarked.filter((itemId) => itemId !== id))
        } else {
            setIsBookmarked([...isBookmarked, id])
        }
    }

    // console.log(units);
    useEffect(() => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper
            swiper.navigation.update()
        }
    }, [])

    const formatDistance = (distance) => {
        if (distance >= 1) {
            return `${(distance / 1).toFixed(2)} km`
        } else {
            return `${(distance * 1000).toFixed(0)} m`
        }
        return distance
    }

    // console.log(image);
    return (
        // <Link>
        <div className={`${styles['padding-top-container']} `}>
            {' '}
            {units.map((units) => (
                <div
                    key={units.id}
                    className={`${styles['main-unit-container']} `}
                    id={`user-${units.id}`}
                >
                    <Link to={`/unit/${units.id}`}>
                        <div className={`${styles['top-unit-container']} `}>
                            <UserAvatar
                                avatar_url={units.landlord.profile_picture_img}
                            />
                            <p className="title">
                                {units.landlord.first_name}{' '}
                                {units.landlord.middle_name}{' '}
                                {units.landlord.last_name}
                            </p>
                        </div>
                    </Link>

                    <Link to={`/unit/${units.id}`}>
                        {' '}
                        <div className={`${styles['image-unit-container']}`}>
                            <div className={`${styles['distance-container']}`}>
                                <p>{formatDistance(units.distance)}</p>
                            </div>
                            <div style={{ height: '100%' }}>
                                <ListAfterSearchImage images={units.images} />
                            </div>
                        </div>
                    </Link>

                    <div className={`${styles['content-container']} `}>
                        <Link
                            to={`/unit/${units.id}`}
                            className={`${styles['main-text-container']} `}
                        >
                            <div className={`${styles['text-container']} `}>
                                <div className={`${styles['name-container']}`}>
                                    <p>{units.name}</p>
                                </div>
                                <div
                                    className={`${styles['address-container']}`}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TbMapPin
                                                style={{
                                                    fill: 'transparent',
                                                    paddingRight: '2px',
                                                }}
                                            />
                                        </span>
                                        <p>{units.address}</p>
                                    </div>
                                </div>
                                <div
                                    className={`${styles['price-container']} `}
                                >
                                    <p
                                        style={{
                                            fontWeight: '700',
                                            fontSize: '20px',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        ₱{units.price}{' '}
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: 'var(--fc-body-light)',
                                            }}
                                        >
                                            /month
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <div className={`${styles['bookmark-container']}`}>
                            <ListAfterSearchBookmark unitId={units.id} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        // </Link>
    )
}

export default ListAfterSearch
