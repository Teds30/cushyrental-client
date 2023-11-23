import React, { useEffect, useState } from 'react'

import { FaCheck } from 'react-icons/fa6'

import BorderedButton from '../../../components/Button/BorderedButton'
import SubscriptionIcon from './SubscriptionIcon'
import BorderlessButton from '../../../components/Button/BorderlessButton'
import SubscriptionModal from './SubscriptionModal'

import styles from './Subscriptions.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SubscriptionCard = (props) => {
    const { subscription } = props
    const [ showAllFeatures, setShowAllFeatures ] = useState(false);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    const showAllFeaturesHandler = () => {
        setShowAllFeatures(prevShowAllFeatures => !prevShowAllFeatures);
    }

    const SubscriptionConfirmHandler = () => {
        setSubscriptionModalOpen(prevSubscriptionModalOpen => !prevSubscriptionModalOpen);
    }

    const features = subscription.features.split(';') ?? []

    const seeAllFeatureButton = showAllFeatures ? (<BorderlessButton rightIcon={<KeyboardArrowUpIcon />} onClick={showAllFeaturesHandler}>See less features</BorderlessButton>) : (<BorderlessButton rightIcon={<KeyboardArrowDownIcon />} onClick={showAllFeaturesHandler}>See all features</BorderlessButton>)

    return (
        <div className={styles['card']}>
            <div className={styles['subscription-title-container']}>
                <div className={styles['subscription-details']}>
                    <div className={styles['subscription-title']}>
                        <div className={styles['subscriptions-icon']}>
                            <SubscriptionIcon hex_color={subscription.hex_color}/>
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

            <p className={`${styles['subscription-details']}`}>{subscription.details}</p>
            <div className={styles['features-container']}>
                {features &&
                    features.map((feature, index) => {
                        if (showAllFeatures === false && index === 2) {
                            return;
                        } else {
                            return (<div className={styles['feature']} key={index}>
                            {
                                <span>
                                    <FaCheck
                                        style={{ fill: 'var(--accent)' }}
                                    />
                                </span>
                            }
                            <p>{feature}</p>
                        </div>);
                        }
                })}
            </div>
            {features.length > 3 && seeAllFeatureButton}
            <div className={styles['action']}>
                <BorderedButton width="100%" onClick={SubscriptionConfirmHandler}>Subscribe</BorderedButton>
            </div>
            <SubscriptionModal
                open={subscriptionModalOpen}
                onClose={() => setSubscriptionModalOpen(false)}
                onTerminate={SubscriptionConfirmHandler}
                subscriptionId={subscription.id}
            />
        </div>  
    )
}

export default SubscriptionCard