import React, { useState, useEffect } from 'react'
import styles from './ViewProfile.module.css'
import useImageManager from '../../hooks/data/image-hook'

const LandlordUnitImage = (props) => {
    const { image } = props
    const { fetchImages, fetchImage } = useImageManager()
    const [imagesData, setImagesData] = useState([])

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const responseImage = await fetchImage(image)
                setImagesData(responseImage)
            } catch (error) {
                console.error('Error fetching images:', error.message)
            }
        }

        if (image) fetchImagesData()
    }, [fetchImages])

    return (
        <div>
            {imagesData && (
                <img
                    src={imagesData}
                    alt="Unit"
                    className={styles['unit-image']}
                />
            )}
        </div>
    )
}

export default LandlordUnitImage
