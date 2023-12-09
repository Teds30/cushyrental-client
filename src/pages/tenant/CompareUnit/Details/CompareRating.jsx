import React, { useEffect, useState } from 'react'

import styles from '../UnitComparing.module.css'

import useHttp from '../../../../hooks/http-hook'
import useImageManager from '../../../../hooks/data/image-hook'
import CompareAttribute from './CompareAttribute'
import { TbMapPin } from 'react-icons/tb'
import { Rating } from '@mui/material'

const CompareRating = (props) => {
    const { selectedUnits } = props

    const { sendRequest } = useHttp()

    let content

    const fetchReviews = async (unitId) => {
        const response = await sendRequest({
            url: `${
                import.meta.env.VITE_BACKEND_LOCALHOST
            }/api/unit_reviews/${unitId}`,
        })
        return response
    }

    content = selectedUnits?.map((unit, index) => {
        return (
            <div className={styles['segment-container']} key={index}>
                <p className="title">Rating</p>
                <Rating
                    value={unit.average_ratings}
                    precision={0.5}
                    sx={{
                        fontSize: '20px',
                        color: 'var(--body)',
                        '& svg': {
                            fill: 'var(--body)',
                        },
                    }}
                />
                <p>{unit.reviews_count} reviews</p>
            </div>
        )
    })

    return <section className={styles['segment']}>{content}</section>
}

export default CompareRating
