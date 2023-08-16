import React from 'react'

import Button from './Button'

import styles from './BorderlessButton.module.css'

const BorderlessButton = (props) => {
    return (
        <Button {...props} btnStyle={styles} loadingColor="primary">
            {props.children}
        </Button>
    )
}

export default BorderlessButton
