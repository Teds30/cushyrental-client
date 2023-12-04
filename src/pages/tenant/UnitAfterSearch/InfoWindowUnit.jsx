import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../../components/Button/PrimaryButton'

import styles from './InfoWindowUnit.module.css'

import useImageManager from '../../../hooks/data/image-hook'
import { useNavigate } from 'react-router-dom'

const InfoWindowUnit = (props) => {
    const { unit } = props
    const navigate = useNavigate()

    const { fetchImage, isLoading } = useImageManager()
    const [unitImg, setUnitImg] = useState()

    useEffect(() => {
        const handleFetch = async () => {
            console.log(unit)
            try {
                console.log(unit.images[0].image)
                const res = await fetchImage(
                    unit.images[0].image.replace('images/', '')
                )
                setUnitImg(res)
            } catch (err) {
                console.log(err)
            }
        }
        handleFetch()
    }, [unit])
    return (
        <div className={styles['info-unit-container']}>
            <div className={styles['info-unit-image']}>
                <img src={unitImg} alt="" />
            </div>
            <div>
                <h2>₱{unit.price}</h2>
                <p>{unit.name}</p>
            </div>

            <PrimaryButton
                width="100%"
                onClick={() => {
                    navigate(`/unit/${unit.id}`)
                }}
            >
                View Unit
            </PrimaryButton>
        </div>
    )
}

export default InfoWindowUnit
