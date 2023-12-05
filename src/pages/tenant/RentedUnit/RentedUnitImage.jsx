import React, { useEffect, useState } from 'react'
import useImageManager from '../../../hooks/data/image-hook'

import no_img from '../../../assets/cushyrental.svg'

const RentedUnitImage = (props) => {
    const { images } = props
    const { fetchImageById, fetchImages, fetchImage, isLoading } =
        useImageManager()
    const [unitPhoto, setUnitPhoto] = useState('')

    useEffect(() => {
        const handleFetch = async () => {
            try {
                // const res = await fetchImages()
                // const imageData = res.filter(
                //     (unit_image) => unit_image.id === images.image_id
                //
                const res2 = await fetchImageById(images.image_id)
                setUnitPhoto(res2)
            } catch (err) {}
        }

        if (images) {
            handleFetch()
        } else {
            setUnitPhoto(no_img)
        }
    }, [])

    return (
        !isLoading &&
        unitPhoto !== '' && (
            <img
                src={unitPhoto === '' ? photo : unitPhoto}
                alt=""
                // alt={images.umit.images.image.name}
            />
        )
    )
}

export default RentedUnitImage
