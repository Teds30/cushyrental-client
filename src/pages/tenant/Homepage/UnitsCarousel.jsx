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
import { Link } from 'react-router-dom'

const UnitsCarousel = () => {
    const { fetchGoldUnits } = useSubscriptionManager()

    const [units, setUnits] = useState([])

    useEffect(() => {
        const fetchUnits = async () => {
            const res = await fetchGoldUnits()

            console.log(res);

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
                        <Link to={`/unit/${unit.unit_id}`}>
                            <UnitCard unit={unit} />
                        </Link>
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
                        width="360"
                        height="114"
                        viewBox="0 0 360 114"
                        fill="none"
                    >
                        <path
                            d="M360.001 0.499207C324.701 192.099 105.292 84.3318 0 4.49841L0.0010376 113.5L360.001 113.5V0.499207Z"
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
            <div
                className={styles['wave2']}
                style={{
                    marginTop: '0px',
                    marginRight: '-30px !important',
                }}
            >
                <svg
                    width="360"
                    height="109"
                    viewBox="0 0 360 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 -0.000732422C0 -0.000732422 49.835 -2.86102e-06 143 -2.86102e-06C236.165 -2.86102e-06 360 -0.000729561 360 -0.000729561C356.216 25.3868 351.202 32.8311 344.732 47.2918C273.443 206.624 0 -114.156 0 47.2918C0 208.739 0 -0.000732422 0 -0.000732422Z"
                        fill="url(#paint0_linear_8141_5622)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_8141_5622"
                            x1="182.255"
                            y1="-252.938"
                            x2="182.255"
                            y2="93.0661"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0.598958" stop-color="#1D6156" />
                            <stop
                                offset="1"
                                stop-color="#03B077"
                                stop-opacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default UnitsCarousel
