import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import useImageManager from '../../../hooks/data/image-hook'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './UnitAfterSearch.css'

import { Pagination, Navigation } from 'swiper/modules'

// import pics from '../../../assets/gcash.jpg';

const ListAfterSearchImage = (props) => {
    const { images } = props
    const { fetchImage, isLoading } = useImageManager()

    const [unitImages, setUnitImages] = useState([])

    const imageContent1 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide key={index}>
                <img
                    src={image}
                    style={{ height: '100%', objectFit: 'cover' }}
                />
            </SwiperSlide>
        ))

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const promises = images.map(async (image) => {
                    const unitImage = await fetchImage(
                        image.image.replace('images/', '')
                    )
                    return unitImage
                })

                const resolvedImages = await Promise.all(promises)
                setUnitImages(resolvedImages)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="unitSwiperImage"
            >
                {imageContent1}
            </Swiper>
        </>
    )
}

export default ListAfterSearchImage
