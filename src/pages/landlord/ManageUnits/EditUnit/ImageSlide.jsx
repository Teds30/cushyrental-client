import React, { useEffect, useState } from 'react'

import styles from './EditUnit.module.css'

const ImageSlide = ({ image }) => {

    return (
        <div className={styles['img-slide']}>
            <img src={image.image} alt={image.name} />
        </div>
    )
}

export default ImageSlide
