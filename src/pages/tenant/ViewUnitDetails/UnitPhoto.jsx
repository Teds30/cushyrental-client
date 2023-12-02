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
import { Backdrop, Box, IconButton } from '@mui/material'
import { IoClose } from 'react-icons/io5'

import { useQueries, useQuery } from '@tanstack/react-query'

export default function UnitPhoto(props) {
    const { images } = props
    const { fetchImage, isLoading } = useImageManager()

    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [unitImages, setUnitImages] = useState([])

    const [open, setOpen] = useState(false)
    const [fullImage, setFullImage] = useState(null)
    const [imageFullScreen, setImageFullScreen] = useState(false)

    const handleClose = () => {
        setOpen(false)
        setFullImage(null)
        setImageFullScreen(false)
    }
    const handleFullScreen = () => {
        setImageFullScreen(!imageFullScreen)
    }

    const imageContent1 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide key={index} className="swiperSlide">
                <img
                    src={image}
                    onClick={(e) => {
                        setFullImage(e)
                        setOpen(true)
                    }}
                />
            </SwiperSlide>
        ))
    const imageContent2 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide
                key={index + unitImages.length + 1}
                className="swiperSlide"
            >
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
            {fullImage && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: imageFullScreen
                            ? 'rgba(0,0,0,1)'
                            : 'rgba(255,255,255,1)',
                        transition: '.5s',
                    }}
                    open={open}
                    // onClick={handleClose}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                        onClick={() => imageFullScreen && handleFullScreen()}
                    >
                        {!imageFullScreen && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingInline: '8px',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        alignSelf: 'flex-start',
                                    }}
                                    size="large"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleClose}
                                >
                                    <IoClose
                                        style={{ fill: 'var(--accent)' }}
                                    />
                                </IconButton>
                            </Box>
                        )}

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingInline: !imageFullScreen && '8px',
                                transition: '.5s',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={fullImage.target.src}
                                alt=""
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    borderRadius: !imageFullScreen && '16px',
                                    transition: '.5s',
                                }}
                                onClick={handleFullScreen}
                            />
                        </Box>
                    </Box>
                </Backdrop>
            )}
        </Box>
    )
}
