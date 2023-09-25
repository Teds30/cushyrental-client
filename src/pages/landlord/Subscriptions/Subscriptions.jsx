import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'

import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { FiChevronLeft } from 'react-icons/fi'

import styles from './Subscriptions.module.css'
import SubscriptionCard from './SubscriptionCard'

const Subscriptions = () => {
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
                    <SubscriptionCard />
                    <SubscriptionCard />
                    <SubscriptionCard />
                </div>
            </div>
        </div>
    )
}

export default Subscriptions
