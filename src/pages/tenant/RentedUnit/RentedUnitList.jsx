import React, { useEffect } from 'react'
import RentedUnit from './RentedUnit'

import styles from './RentedUnitList.module.css'

const RentedUnitList = (props) => {
    const { rentedUnit = [] } = props

    const content = rentedUnit ? (
        rentedUnit.map((rental) => (
            <RentedUnit key={rental.id} rental={rental} />
        ))
    ) : (
        <p style={{ textAlign: 'center' }}>No results.</p>
    )
    return <div className={styles['container']}>{content}</div>
}

export default RentedUnitList
