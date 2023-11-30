import React, { useRef, useState, Fragment, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import useImageManager from '../../../hooks/data/image-hook'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './UnitPhoto.css'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Box } from '@mui/material'
import { useQueries, useQuery } from '@tanstack/react-query'

export default function UnitPhoto(props) {
    const { images } = props
    const { fetchImage, isLoading } = useImageManager()

    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [unitImages, setUnitImages] = useState([])

    const imageContent1 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide key={index} className="swiperSlide">
                <img src={image} />
            </SwiperSlide>
        ))
    const imageContent2 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide key={index + 10} className="swiperSlide">
                <img src={image} />
            </SwiperSlide>
        ))

    const imageQueries = useQueries({
        queries: images.map((image) => ({
            queryKey: ['unit_images', image.id],
            queryFn: () => fetchImage(image.image.replace('images/', '')),
            refetchOnWindowFocus: false,
        })),
    })

    useEffect(() => {
        const handleFetch = async () => {
            const unit_images = imageQueries.map((query) => query.data)

            setUnitImages(unit_images)
        }
        if (imageQueries[0] && imageQueries[0].data && unitImages.length === 0)
            handleFetch()
    }, [imageQueries])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                // gap: '12px',
            }}
        >
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                }}
                loop={true}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {imageContent1}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {imageContent2}
            </Swiper>
        </Box>
    )
}
