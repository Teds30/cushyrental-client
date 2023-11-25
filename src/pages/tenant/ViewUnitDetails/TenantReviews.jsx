import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState, useEffect, Fragment } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import useUnitManager from '../../../hooks/data/units-hook'
import useImageManager from '../../../hooks/data/image-hook'
import BorderedButton from '../../../components/Button/BorderedButton'

import { EffectCoverflow } from 'swiper/modules'

import './TenantReviews.css'

import { Pagination } from 'swiper/modules'
import Reviewer from './Reviewer'
import UnitReviews from '../UnitDetails/UnitReviews'

const TenantReviews = (props) => {
    const { unitId } = props

    const { fetchUnitReviews, isLoading } = useUnitManager()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnitReviews(unitId)

                setReviews(res)
            } catch (err) {}
        }
        handleFetch()
    }, [unitId])

    const content = reviews.map((review, index) => (
        <SwiperSlide key={review.id} className="tenant-review-swiper-slide">
            <Reviewer review={review} />
        </SwiperSlide>
    ))

    return reviews.length !== 0 ? (
        <Fragment>
            <Swiper
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                pagination={true}
                modules={[Pagination]}
                className="tenant-review-swiper"
                style={{ transform: '0' }}
            >
                {content}
            </Swiper>
            <UnitReviews unitId={unitId} />
        </Fragment>
    ) : (
        <p className="caption" style={{ textAlign: 'center' }}>
            No Reviews yet.
        </p>
    )
}

export default TenantReviews
