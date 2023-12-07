import React, { useEffect, useState } from 'react'

import styles from './UnitCard.module.css'

import useImageManager from '../../../hooks/data/image-hook'

const UnitCard = (props) => {
    const { unit } = props

    const { fetchImage } = useImageManager()
    const [image, setImage] = useState()

    const imageThumbnail = unit.unit.images
        .filter((image, index) => image.is_thumbnail == 1)
        .shift()

    // console.log(unit)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchImage(
                imageThumbnail.image.image.replace('images/', '')
            )
            setImage(res)
        }

        fetchData()
    }, [])
    const formattedNumber = unit.unit.price.toLocaleString()

    return (
        <div className={styles['card']}>
            <img src={image && image} alt="" />
            <div className={styles['dark']}></div>
            {/* <span>₱ {formattedNumber}</span> */}
        </div>
    )
}

export default UnitCard
