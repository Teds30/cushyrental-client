import React from 'react'

//eslint-disable-next-line
import IconButton from '@mui/material/IconButton'

import styles from './IconButton.module.css'

const MyIconButton = (props) => {
    const { size, onClick, disabled } = props
    return (
        <IconButton
            className={styles['icon_button']}
            size={size}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </IconButton>
    )
}

export default MyIconButton
