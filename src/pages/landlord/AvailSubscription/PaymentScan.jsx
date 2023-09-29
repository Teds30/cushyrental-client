import React from 'react'

import styles from './PaymentScan.module.css'

import qr_code from '../../../assets/gcash.jpg'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import { BsArrowRight } from 'react-icons/bs'
import BorderlessButton from '../../../components/Button/BorderlessButton'

const PaymentScan = (props) => {
    const { handleNext, handleBack } = props

    return (
        <div className={styles['container']}>
            <p style={{ textAlign: 'center' }}>
                Please scan the QR code provided and follow the payment
                instructions. Or pay directly to the given number. Make sure to
                input the correct amount and verify the payment details before
                proceeding with the payment.
            </p>
            <div className={styles['card-container']}>
                <div className={styles['card']}>
                    <h3>QR Code</h3>
                    <div className={styles['qr_code']}>
                        <img src={qr_code} alt="qr_code" />
                    </div>
                    <div className={styles['option_label']}>
                        <div className={styles['hr']}></div>
                        Or through this number
                        <div className={styles['hr']}></div>
                    </div>
                    <h2>+639123456789</h2>
                </div>
            </div>
            <div className={styles['actions']}>
                <BorderlessButton onClick={handleBack}>Back</BorderlessButton>
                <PrimaryButton
                    width="100%"
                    rightIcon={<BsArrowRight strokeWidth={1} />}
                    onClick={handleNext}
                >
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}

export default PaymentScan
