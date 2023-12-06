import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './RecommendedUnits.module.css'
import LandlordUnit from '../ViewLandlordProfile/LandlordUnit'
import useSubscriptionManager from '../../../hooks/data/subscriptions-hooks'

const RecommendedUnits = () => {
    const { fetchSilverUnits } = useSubscriptionManager()

    const [units, setUnits] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const res = await fetchSilverUnits()

            setUnits(res)
        }
        loadData()
    }, [])
    return (
        <div className={styles['container']}>
            <h4>Recommended for you</h4>
            <div className={styles['units-container']}>
                {units ? (
                    units.map((unit, index) => {
                        if (index + 1 === units.length) {
                            return (
                                <Fragment>
                                <Fragment>
                                    <LandlordUnit unit={unit.unit} key={index} />
                                </Fragment>
                                <p>No more units found.</p>
                                </Fragment>
                            )
                        }

                        return <LandlordUnit unit={unit.unit} key={index} />
                    })
                ) : (
                    <p>No units found.</p>
                )}
            </div>
        </div>
    )
}

export default RecommendedUnits
