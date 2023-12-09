import React, { useEffect, useState } from 'react'
import useImageManager from '../../../../hooks/data/image-hook'

import styles from '../UnitComparing.module.css'
import { Link, useNavigate } from 'react-router-dom'
const CompareUnitImage = (props) => {
    const { unit } = props

    const navigate = useNavigate()

    const [unitImg, setUnitImg] = useState()
    const { fetchImage, isLoading } = useImageManager()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(
                    unit.images
                        .sort((a, b) => b.is_thumbnail - a.is_thumbnail)[0]
                        .image.replace('images/', '')
                )
                setUnitImg(res)
            } catch (err) {
                console.log(err)
            }
        }
        if (unit.images[0]) handleFetch()
    }, [unit])

    return (
        <Link
            to={`/unit/${unit.id}`}
            onClick={(e) => {
                e.preventDefault()
                navigate(`/unit/${unit.id}`)
            }}
            className={styles['unit-image']}
        >
            <div className={styles['aspect-ratio-container']}>
                <img src={unitImg} alt="" />
            </div>
        </Link>
    )
}

export default CompareUnitImage
