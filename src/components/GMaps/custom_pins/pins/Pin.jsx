import React from 'react'

import { AiFillHome } from 'react-icons/ai'

import styles from './Pin.module.css'
const Pin = () => {
    return (
        <div className={styles.property}>
            <div className={styles.icon}>
                <i
                    aria-hidden="true"
                    className={
                        styles.fa +
                        ' ' +
                        styles['fa-icon'] +
                        ' ' +
                        styles['fa-house']
                    }
                    title="house"
                ></i>
                <AiFillHome />
            </div>
        </div>
    )
}

export default Pin
