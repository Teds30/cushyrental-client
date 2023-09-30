import React from 'react'

import { FaCheck } from 'react-icons/fa6'

import BorderedButton from '../../../components/Button/BorderedButton'

import styles from './Subscriptions.module.css'

const SubscriptionCard = (props) => {
    const { subscription } = props

    const features = subscription.features.split(';') ?? []

    return (
        <div className={styles['card']}>
            <div className={styles['subscription-title-container']}>
                <div className={styles['subscription-details']}>
                    <div className={styles['subscription-title']}>
                        <div className={styles['subscriptions-icon']}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    fill={subscription.hex_color}
                                />
                                <path
                                    d="M11.2885 11.49L10.315 14.1673C10.2911 14.2315 10.2482 14.287 10.1919 14.3261C10.1356 14.3652 10.0688 14.3862 10.0002 14.3862C9.93169 14.3862 9.8648 14.3652 9.80854 14.3261C9.75228 14.287 9.70934 14.2315 9.68549 14.1673L8.71191 11.49C8.69491 11.4438 8.66809 11.4019 8.63332 11.3671C8.59854 11.3324 8.55663 11.3055 8.51048 11.2885L5.83315 10.315C5.7689 10.2911 5.71349 10.2482 5.67436 10.1919C5.63523 10.1356 5.61426 10.0688 5.61426 10.0002C5.61426 9.93169 5.63523 9.8648 5.67436 9.80854C5.71349 9.75228 5.7689 9.70934 5.83315 9.68549L8.51048 8.71191C8.55663 8.69491 8.59854 8.66809 8.63332 8.63332C8.66809 8.59854 8.69491 8.55663 8.71191 8.51048L9.68549 5.83315C9.70934 5.7689 9.75228 5.71349 9.80854 5.67436C9.8648 5.63523 9.93169 5.61426 10.0002 5.61426C10.0688 5.61426 10.1356 5.63523 10.1919 5.67436C10.2482 5.71349 10.2911 5.7689 10.315 5.83315L11.2885 8.51048C11.3055 8.55663 11.3324 8.59854 11.3671 8.63332C11.4019 8.66809 11.4438 8.69491 11.49 8.71191L14.1673 9.68549C14.2315 9.70934 14.287 9.75228 14.3261 9.80854C14.3652 9.8648 14.3862 9.93169 14.3862 10.0002C14.3862 10.0688 14.3652 10.1356 14.3261 10.1919C14.287 10.2482 14.2315 10.2911 14.1673 10.315L11.49 11.2885C11.4438 11.3055 11.4019 11.3324 11.3671 11.3671C11.3324 11.4019 11.3055 11.4438 11.2885 11.49Z"
                                    fill={subscription.hex_color}
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h2>{subscription.name}</h2>
                    </div>
                </div>
            </div>
            <div className={styles['price-container']}>
                <div className={styles['currency']}>₱</div>
                <h1>{subscription.price}</h1>
                <div className={styles['month-label']}>/month</div>
            </div>

            <p>{subscription.details}</p>
            <div className={styles['features-container']}>
                {features &&
                    features.map((feature, index) => (
                        <div className={styles['feature']} key={index}>
                            {
                                <span>
                                    <FaCheck
                                        style={{ fill: 'var(--accent)' }}
                                    />
                                </span>
                            }
                            <p>{feature}</p>
                        </div>
                    ))}
            </div>
            <div className={styles['action']}>
                <BorderedButton width="100%">Subscribe</BorderedButton>
            </div>
        </div>
    )
}

export default SubscriptionCard
