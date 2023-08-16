import React from 'react'

import styles from './StatusChip.module.css'

const StatusChip = (props) => {
    const { children, type = 'success' } = props

    let status_style
    if (type === 'success') status_style = styles['status-chip-success']
    if (type === 'pending') status_style = styles['status-chip-pending']
    if (type === 'danger') status_style = styles['status-chip-danger']
    if (type === 'cancel') status_style = styles['status-chip-cancel']
    return (
        <div className={`${styles['status-chip']} ${status_style}`}>
            {children}
        </div>
    )
}

export default StatusChip
