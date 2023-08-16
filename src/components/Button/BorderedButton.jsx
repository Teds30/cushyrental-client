import React from 'react'

import Button from './Button'

import styles from './BorderedButton.module.css'

const BorderedButton = (props) => {
    return (
        <Button {...props} btnStyle={styles} loadingColor="primary">
            {props.children}
        </Button>
    )
}

export default BorderedButton
