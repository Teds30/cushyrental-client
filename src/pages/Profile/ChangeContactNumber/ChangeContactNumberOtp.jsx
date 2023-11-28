import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import PrimaryButton from '../../../components/Button/PrimaryButton'
import useUserManager from '../../../hooks/data/users-hook'
import useNotistack from '../../../hooks/notistack-hook'
import AuthContext from '../../../context/auth-context'

import styles from '../../Login/SignInPage.module.css'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import useHttp from '../../../hooks/http-hook'

const ChangeContactNumberOtp = (props) => {
    const { user, token } = props
    const { updateUser, isLoading } = useUserManager()
    const { sendRequest } = useHttp()
    const navigate = useNavigate()
    const { notify } = useNotistack()
    const userCtx = useContext(AuthContext)

    const [otpDigits, setOtpDigits] = useState(Array(5).fill(''))
    const [showInfo, setShowInfo] = useState(false)
    const [otp, setOtp] = useState([])
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)
    const [time, setTime] = useState(120)

    const otpDigitChangeHandler = (index, value) => {
        const updatedOtpDigits = [...otpDigits]
        updatedOtpDigits[index] = value

        if (
            otp.join('') != updatedOtpDigits.join('') &&
            updatedOtpDigits.length != 5
        ) {
            setIsVerified(false)
            setError(true)
        } else if (
            otp.join('') === updatedOtpDigits.join('') &&
            updatedOtpDigits.length === 5
        ) {
            setIsVerified(true)
            setError(false)
        }

        setOtpDigits(updatedOtpDigits)
    }

    const toggleInfo = () => {
        setShowInfo(!showInfo)
    }

    const generateOTP = async () => {
        // REMOVE COMMENT FOR LIVE

        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/request_otp`,
            method: 'POST',
            body: JSON.stringify({ number: user.phone_number }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        setTime(120)
    }

    const resendHandler = () => {
        generateOTP()
        setError(false)
        setOtpDigits(Array(5).fill(''))
        setTime(120)
    }

    const submitHandler = async () => {
        if (otpDigits.length !== 5) {
            return
        }

        setError(false)

        const otpCode = otpDigits.join('')

        console.log({ number: user.phone_number, otp: otpCode })

        // REMOVE COMMENT FOR LIVE

        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/validate_otp`,
            method: 'POST',
            body: JSON.stringify({ number: user.phone_number, otp: otpCode }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const isEqual = res.status === 'approved'

        // remove || true for live
        if (isEqual) {
            try {
                console.log({ ...user, phone_number: user.phone_number })
                const res = await updateUser(
                    {
                        ...user,
                        phone_number: user.phone_number,
                    },
                    user.id
                )
                navigate('/profile/user_profile')
                notify('Successfully update phone number.', 'success')
            } catch (err) {}
        } else {
            setError(true)
        }
    }

    useEffect(() => {
        let interval
        if (time !== 0) {
            interval = setInterval(() => {
                setTime(time - 1)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [time, setTime])

    return (
        <div className={`${styles['forgot-password-code-row']}`}>
            <div className={`${styles['enter-code']} `}>
                Enter Code
                <AiOutlineInfoCircle size={20} onClick={toggleInfo} />
            </div>

            {showInfo && (
                <div
                    className={`${styles['overlay-bubble']} ${styles['show']}`}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, hic.
                </div>
            )}

            <div className={`${styles['otp-main']}`}>
                <div className={`${styles['otp-row']}`}>
                    <div className={styles['otp']}>
                        {otpDigits.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className={`${styles['otp-input']} ${
                                    error && styles.error
                                }`}
                                value={digit}
                                onChange={(e) =>
                                    otpDigitChangeHandler(index, e.target.value)
                                }
                            />
                        ))}
                    </div>

                    <div
                        className={`${styles['resend-button']} ${
                            time !== 0 && styles['has-time']
                        }`}
                    >
                        <button
                            disabled={time !== 0 ? true : false}
                            onClick={resendHandler}
                        >
                            {time === 0
                                ? 'Resend'
                                : 'Resend in ' + '(' + time + 's)'}
                        </button>
                    </div>
                </div>

                <PrimaryButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="SUBMIT"
                    width="100%"
                    onClick={submitHandler}
                >
                    Submit Code
                </PrimaryButton>
            </div>
        </div>
    )
}

export default ChangeContactNumberOtp
