import React, { useEffect, useState } from 'react'
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
            <h3>Recommended Units</h3>
            <div className={styles['units-container']}>
                {units ? (
                    units.map((unit) => {
                        return (
                            <Link
                                to={`/unit/${unit.unit.id}`}
                                key={unit.unit.id}
                            >
                                <LandlordUnit unit={unit.unit} />
                            </Link>
                        )
                    })
                ) : (
                    <p>No units found.</p>
                )}
            </div>
        </div>
    )
}

export default RecommendedUnits
