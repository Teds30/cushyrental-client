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
    const [image, setImage] = useState([]) // Initialize to null
    const [currentIndex, setCurrentIndex] = useState(0)
    const swiperRef = useRef(null)

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.realIndex) // Update the current index when the slide changes
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await Promise.all(unitImages.map(async (image) => {
                    const imageBlob = await fetchImage(image.image.replace("images/", ""));
                    return { ...image, image: imageBlob };
                }));
                setImage(res)
            } catch (err) {
            }
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
                        to="/subscriptions"
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
                    className={styles['img-swiper']}
                >
                    {image.length !== 0 &&
                        image.map((img) => {
                            return (
                                <SwiperSlide key={img.id}>
                                    <ImageSlide image={img} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
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
