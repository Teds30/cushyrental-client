import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Submitted.module.css'

import { BsCheckLg } from 'react-icons/bs'
import PrimaryButton from '../../../components/Button/PrimaryButton'

const Submitted = () => {
    const navigate = useNavigate()
    return (
        <div className={styles['container']}>
            <div className={styles['check-icon-outer']}>
                <div className={styles['check-icon']}>
                    <BsCheckLg size={32} style={{ fill: '#fff' }} />
                </div>
            </div>
            <h2>Submitted Successfully🎉</h2>
            <p style={{ textAlign: 'center' }}>
                Subscription of this unit may take 24 hours. Thank you for your
                patience!
            </p>
            <PrimaryButton
                onClick={() => {
                    navigate('/manage_unit')
                }}
            >
                Finish
            </PrimaryButton>
        </div>
    )
}

export default Submitted
