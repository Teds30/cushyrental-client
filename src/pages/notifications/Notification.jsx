import React from 'react'

import moment from 'moment'

import pic from '../../assets/cushyrental.svg'
import styles from './Notifications.module.css'

const Notification = (props) => {
    const { data, is_read = false } = props

    // Parse the datetime string using moment
    const dateTime = moment(data.created_at)

    // Calculate the "ago" format
    const agoFormat = dateTime.fromNow()

    return (
        <div
            className={`${styles['notification']} ${
                !is_read && styles['notification__highlight']
            }`}
        >
            <div className={styles['avatar']}>
                <img src={pic} alt="" />
            </div>
            <div className={styles['content']}>
                <div className={styles['title-container']}>
                    <span className={`${styles['title-wrap']} title`}>
                        {data.title}
                    </span>
                    {!is_read && <div className={styles['is_read_dot']}></div>}
                </div>
                <div className={styles['details']}>
                    <p>{data.message}</p>
                </div>
                <div className={styles['date']}>{agoFormat}</div>
            </div>
        </div>
    )
}

export default Notification
