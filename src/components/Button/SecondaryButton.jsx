import React from 'react'

import Button from './Button'

import styles from './SecondaryButton.module.css'

const SecondaryButton = (props) => {
    return (
        <Button {...props} btnStyle={styles} loadingColor="primary">
            {props.children}
        </Button>
    )
}

export default SecondaryButton
