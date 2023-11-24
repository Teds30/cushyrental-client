import React, { useState, useEffect } from 'react'
import useUnitManager from '../../../hooks/data/units-hook'
import useImageManager from '../../../hooks/data/image-hook'

import { Swiper, SwiperSlide } from 'swiper/react'

import Rating from '@mui/material/Rating'

import CardShadow from '../../../components/Card/CardShadow'

import './TenantReviews.css'
import UserAvatar from '../../../components/Avatar/UserAvatar'

import styles from './Reviewer.module.css'

const Reviewer = (props) => {
    const { review } = props

    const { fetchAvatar } = useImageManager()

    let reviewRating

    if (Math.trunc(review.star) === 1) {
        reviewRating = 'Terrible'
    } else if (Math.trunc(review.star) === 2) {
        reviewRating = 'Poor'
    } else if (Math.trunc(review.star) === 3) {
        reviewRating = 'Fair'
    } else if (Math.trunc(review.star) === 4) {
        reviewRating = 'Good'
    } else {
        reviewRating = 'Excellent'
    }
    let content = (
        <CardShadow>
            <div className="review-detials-col">
                <div className={styles['review-user-profile']}>
                    <UserAvatar
                        avatar_url={review.user.profile_picture_img}
                        size="24px"
                    />
                    <div className={styles['review-user-data']}>
                        <p
                            className="title"
                            style={{
                                fontSize: '12px',
                                fontWeight: '500',
                            }}
                        >
                            {review.user.first_name}{' '}
                            {review.user.last_name[0] + '. '}
                        </p>
                        <p
                            className="smaller-text"
                            style={{
                                fontSize: '10px',
                                fontWeight: '500',
                            }}
                        >
                            {review.user.user_type_id === 1
                                ? 'Tenant'
                                : 'Landlord'}
                        </p>
                    </div>
                </div>

                <div className="review-main">
                    <div className="review-rating">
                        <Rating
                            value={review.star}
                            precision={0.5}
                            sx={{
                                fontSize: '10px',
                                color: 'var(--accent)',
                                '& svg': {
                                    fill: 'var(--accent)',
                                },
                            }}
                        />
                        <span
                            className="smaller-text"
                            style={{
                                fontSize: '10px',
                                fontWeight: '600',
                            }}
                        >
                            {reviewRating}
                        </span>
                    </div>

                    <div className={styles['review-message']}>
                        <p>{review.message}</p>
                    </div>
                </div>
            </div>
        </CardShadow>
    )

    return content
}

export default Reviewer
