import React, { useEffect, useState } from 'react'

import moment from 'moment'

import useImageManager from '../../../hooks/data/image-hook'

import styles from './Subscription.module.css'
import Status from './Status'

import { WiTime4 } from 'react-icons/wi'
import BorderedButton from '../../../components/Button/BorderedButton'

const Subscription = (props) => {
    const { subscription } = props

    const { fetchImage, fetchImages, isLoading } = useImageManager()
    const [image, setImage] = useState(null)

    const now = moment()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const resImage = await fetchImage(subscription.unit.image)
                setImage(resImage)
            } catch (err) {}
        }
        handleFetch()
    }, [subscription])

    return (
        <div className={styles['container']}>
            <div className={styles['row']}>
                <div className="col1">
                    <div className={styles['image-container']}>
                        <img src={image} alt="" />
                    </div>
                </div>
                <div className={styles['col2']}>
                    <Status unitRequestStatus={subscription.request_status} />
                    <p className="title">{subscription.unit.name}</p>
                    <div>
                        <p>
                            Subscription:
                            <span className="title">
                                {' '}
                                {subscription.subscription.name.toUpperCase()}
                            </span>
                        </p>
                    </div>
                    {subscription.date_end &&
                        now <= moment(subscription.date_end) && (
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                }}
                            >
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <WiTime4
                                        style={{ fill: 'var(--fc-body-light)' }}
                                    />
                                </span>
                                <p className="caption">
                                    Expiring{' '}
                                    {moment(subscription.date_end).fromNow()}
                                </p>
                            </div>
                        )}
                </div>
            </div>
            {/* {subscription.request_status === 0 && (
                <div className={styles['row']}>
                    <BorderedButton btnType="danger" width="100%">
                        Cancel
                    </BorderedButton>
                </div>
            )} */}
        </div>
    )
}

export default Subscription
