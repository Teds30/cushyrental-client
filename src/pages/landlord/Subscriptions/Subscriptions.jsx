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
    const settings = {
        centerMode: true,
        infinite: true,
        centerPadding: '0',
        slidesToShow: 3,
        speed: 500,
        focusOnSelect: true,
        variableWidth: true,
    }
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
                        spaceBetween={0}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                    >
                        <SwiperSlide>
                            <SubscriptionCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SubscriptionCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SubscriptionCard />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Subscriptions
