import React, { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import UnitCard from './UnitCard'

import useSubscriptionManager from '../../../hooks/data/subscriptions-hooks'

import './BannerStyle.css'
import styles from './UnitsCarousel.module.css'
import { Box } from '@mui/material'

import pic from '../../../assets/Units/pics.png'

const UnitsCarousel = () => {
    const { fetchGoldUnits } = useSubscriptionManager()

    const [units, setUnits] = useState([])

    useEffect(() => {
        const fetchUnits = async () => {
            const res = await fetchGoldUnits()

            setUnits(res)
        }
        fetchUnits()
    }, [])

    let content = (
        <Box
            sx={{
                width: '100%',
            }}
            className={'banner-swiper-wrapper'}
        >
            {units &&
                units.map((unit, index) => (
                    <SwiperSlide key={index} className="banner-swiper-slide">
                        <UnitCard unit={unit} />
                    </SwiperSlide>
                ))}
        </Box>
    )

    return (
        <div className={styles['container']}>
            <div className={styles['wave1-container']}>
                <div className={styles['wave1']}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="514"
                        height="116"
                        viewBox="0 0 514 116"
                        fill="none"
                    >
                        <path
                            d="M514 3.05176e-05C463.6 191.6 150.333 79.8334 0 3.05176e-05V116H514V3.05176e-05Z"
                            fill="#1D6156"
                        />
                    </svg>
                </div>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={10}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                // pagination={true}
                pagination={{ dynamicBullets: true, dynamicMainBullets: 3 }}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay, Pagination]}
                className="banner-swiper"
                style={{ transform: '0' }}
            >
                {content}
            </Swiper>
            <div className={styles['wave2']} style={{ marginTop: '-1px' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="514"
                    height="98"
                    viewBox="0 0 514 98"
                    fill="none"
                >
                    <path
                        d="M35.5997 0.138585C15.8548 1.48322 9.94636 12.4763 0 27.1386V0.138578L35.5997 0.138585C38.2765 -0.0437036 41.2076 -0.0486688 44.4375 0.138586L514 0.138672V27.1386C485.5 114.139 420.5 126.639 143.5 27.1386C93.5682 9.2028 63.6926 1.25492 44.4375 0.138586L35.5997 0.138585Z"
                        fill="url(#paint0_linear_5587_5365)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_5587_5365"
                            x1="257"
                            y1="0"
                            x2="257"
                            y2="97.1545"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#1D6156" stopOpacity="0.7" />
                            <stop
                                offset="1"
                                stopColor="#1D6156"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default UnitsCarousel
