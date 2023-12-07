import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './RecommendedUnits.module.css'
import LandlordUnit from '../ViewLandlordProfile/LandlordUnit'
import useSubscriptionManager from '../../../hooks/data/subscriptions-hooks'

const RecommendedUnits = () => {
    const { fetchSilverUnits, fetchGoldUnits } = useSubscriptionManager()

    const [units, setUnits] = useState([])

    useEffect(() => {
        const loadData = async () => {
            let subscription;

            subscription = await fetchGoldUnits()
            
            const res = await fetchSilverUnits()

            setUnits({...subscription, ...[...res, ...res})

            setUnits(Object.values(subscription)2])
        }
        loadData()
    }, [])
    return (
        <div className={styles['container']}>
            <h4>Recommended for you</h4>
            <div className={styles['units-container']}>
                {units && (
                    <Fragment>
                        {units.map((unit, index) => {
                            if (index + 1 === units.length) {
                                return (
                                    <Fragment key={index}>
                                        <LandlordUnit
                                            unit={unit.unit}
                                            key={index}
                                        />
                                    </Fragment>
                                )
                            }

                            return <LandlordUnit unit={unit.unit} key={index} />
                        })}
                    </Fragment>
                )}
            </div>
            {units ? (
                <p style={{ textAlign: 'center' }}>No more units found.</p>
            ) : (
                <p style={{ textAlign: 'center' }}>No units found.</p>
            )}
        </div>
    )
}

export default RecommendedUnits
