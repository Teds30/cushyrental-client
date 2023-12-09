import React from 'react'

import styles from '../UnitComparing.module.css'

const CompareUnitPrice = (props) => {
    const { selectedUnits } = props

    let content = selectedUnits?.map((unit, index) => {
        return (
            <div className={styles['segment-container']} key={index}>
                <div className={styles['price-container']}>
                    ₱{unit.price.toLocaleString()}
                </div>
                <div className={styles['month-container']}>
                    {unit.month_deposit && (
                        <p>+ {unit.month_deposit} month deposit</p>
                    )}
                    {unit.month_advance && (
                        <p>+ {unit.month_advance} month advance</p>
                    )}
                </div>
            </div>
        )
    })
    return <section className={styles['segment']}>{content}</section>
}

export default CompareUnitPrice
