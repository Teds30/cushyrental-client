import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './LoadingSpinner.module.css'

const LoadingSpinner = (props) => {
    const { center, color, width } = props

    let style = ''
    let colorStyle = ''

    if (center) {
        style = styles.center
    }

    if (color === 'white') {
        colorStyle = styles['color__white']
    }

    if (color === 'primary') {
        colorStyle = styles['color__primary']
    }

    return (
        <div className={style}>
            <CircularProgress className={colorStyle} size={width} />
        </div>
    )
}

export default LoadingSpinner
