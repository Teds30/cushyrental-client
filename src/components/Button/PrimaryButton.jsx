import React from 'react'

import Button from './Button'

import styles from './PrimaryButton.module.css'

const PrimaryButton = (props) => {
    return (
        <Button {...props} btnStyle={styles} >
            {props.children}
        </Button>
    )
}

export default PrimaryButton
