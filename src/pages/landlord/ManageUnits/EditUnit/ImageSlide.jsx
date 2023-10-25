import React, { useEffect, useState } from 'react'

import styles from './EditUnit.module.css'

import useImageManager from '../../../../hooks/data/image-hook'

const ImageSlide = ({ image }) => {
    const [imageBlob, setImageBlob] = useState()
    const { fetchImage } = useImageManager()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(image.image)
                // console.log('asd: ', image)
                setImageBlob(res)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return (
        <div className={styles['img-slide']}>
            <img src={imageBlob} alt={image.name} />
        </div>
    )
}

export default ImageSlide
