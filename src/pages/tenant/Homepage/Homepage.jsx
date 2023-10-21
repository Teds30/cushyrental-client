import React from 'react'

import styles from './Homepage.module.css'
import BottomNavigation from '../../../components/Layout/BottomNavigation/BottomNavigation'

import brand_logo from '../../../assets/cushyrental.svg'
import UnitsCarousel from './UnitsCarousel'
import RecommendedUnits from './RecommendedUnits'

const Homepage = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['brand-container']}>
                <img src={brand_logo} alt="logo" width="64" height="64" />
                <div className={styles['brand-label']}>CushyRental</div>
            </div>
            <div className={styles['carousel-container']}>
                <div className={styles['carousel']}>
                    <UnitsCarousel />
                </div>
            </div>

            <RecommendedUnits />

            <BottomNavigation current={0} isTenant={true} />
        </div>
    )
}

export default Homepage
