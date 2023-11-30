import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState, useEffect, Fragment } from 'react'

import useUnitManager from '../../../hooks/data/units-hook'
import useImageManager from '../../../hooks/data/image-hook'
import BorderedButton from '../../../components/Button/BorderedButton'

import './TenantReviews.css'

import Reviewer from './Reviewer'
import UnitReviews from '../UnitDetails/UnitReviews'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

const TenantReviews = (props) => {
    const { unitId } = props

    const { fetchUnitReviews, isLoading } = useUnitManager()
    const [reviews, setReviews] = useState([])

    const [thumbsSwiper, setThumbsSwiper] = useState(null)

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
                // navigation={true}
                watchSlidesProgress={true}
                // thumbs={{ swiper: thumbsSwiper }}
                freeMode={true}
                modules={[FreeMode]}
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
