import React, { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { FiChevronLeft } from 'react-icons/fi'

import styles from './Subscriptions.module.css'
import SubscriptionCard from './SubscriptionCard'

import useSubscriptionManager from '../../../hooks/data/subscriptions-hooks'

const Subscriptions = () => {
    const { fetchSubscriptions } = useSubscriptionManager()
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchSubscriptions()
                setSubscriptions(res)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['nav-container']}>
                <Link
                    to="/myunit-landlord"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate(-1)
                    }}
                    className={`${styles['link-button']}`}
                >
                    <IconButton size="large" color="inherit" aria-label="menu">
                        <FiChevronLeft
                            style={{
                                color: 'var(--fc-strong)',
                                fill: 'transparent',
                            }}
                        />
                    </IconButton>
                </Link>
            </div>
            <div className={styles['header-container']}>
                <h1>Subscription</h1>
                <h3>THE RIGHT PLAN FOR YOUR BUSINESS</h3>
                <p className="smaller-text">
                    Unlock the full potential of your rental business with our
                    subscription plans - the ultimate solution for landlords
                    looking to showcase their properties and attract the perfect
                    tenants!
                </p>
            </div>
            <div className={styles['subscriptions-container']}>
                <div className={styles['cards-container']}>
                    <Swiper
                        slidesPerView={1}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 100,
                            },
                            '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 250,
                            },
                            '@1.00': {
                                slidesPerView: 3,
                                spaceBetween: 250,
                            },
                        }}
                    >
                        {subscriptions &&
                            subscriptions.map((sub) => (
                                <SwiperSlide
                                    key={sub.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SubscriptionCard subscription={sub} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Subscriptions
