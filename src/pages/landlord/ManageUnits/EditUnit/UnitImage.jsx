import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import useImageManager from '../../../../hooks/data/image-hook'
import SecondaryButton from '../../../../components/Button/SecondaryButton'

import styles from './EditUnit.module.css'
import stars from '../../../../../src/assets/stars.svg'
import { BiSolidEdit } from 'react-icons/bi'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import { EffectCoverflow, Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import ImageSlide from './ImageSlide'

const UnitImage = (props) => {
    const { unitImages, unitId } = props

    const { fetchImage } = useImageManager()
    const [image, setImage] = useState(null) // Initialize to null
    const [currentIndex, setCurrentIndex] = useState(0)
    const swiperRef = useRef(null)

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.realIndex) // Update the current index when the slide changes
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const data =
                    unitImages.filter((image) => image.is_thumbnail === 1) ??
                    unitImages
                const res = await fetchImage(data[0].image)
                // console.log('asd: ', unitImages)
                setImage(res)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return (
        <div className={`${styles['image-container']}`}>
            <div className={`${styles['learn-more']}`}>
                <img src={stars} alt="Stars" />
                <p>
                    Promote this unit to reach more people.{' '}
                    <Link
                        to="/avail_subscriptions"
                        style={{ color: 'var(--accent)' }}
                    >
                        {' '}
                        Learn How
                    </Link>
                </p>
            </div>

            <div className={`${styles['image']}`}>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={handleSlideChange}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className={styles['img-swiper']}
                >
                    {unitImages &&
                        unitImages.map((img) => {
                            return (
                                <SwiperSlide key={img.id}>
                                    <ImageSlide image={img} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
                {/* <img src={image} alt={unitImages[0] && unitImages[0].name} /> */}
                <div className={`${styles['image-chip']}`}>
                    <p>
                        {currentIndex + 1} of {unitImages.length}
                    </p>
                </div>
                <div className={`${styles['edit-image-button']}`}>
                    <Link to={`/manage_unit/edit/images/${unitId}`}>
                        <SecondaryButton leftIcon={<BiSolidEdit size={20} />}>
                            <p>Edit images</p>
                        </SecondaryButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UnitImage
