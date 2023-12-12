import React, { useEffect, useState } from 'react'

import styles from '../UnitComparing.module.css'

import useHttp from '../../../../hooks/http-hook'
import useImageManager from '../../../../hooks/data/image-hook'
import CompareAttribute from './CompareAttribute'
import { TbMapPin } from 'react-icons/tb'

const CompareLocation = (props) => {
    const { selectedUnits } = props
    let content = selectedUnits?.map((unit, index) => {
        return (
            <div className={styles['segment-container']} key={index}>
                <TbMapPin size={32} strokeWidth={1} />
                <p className="title">Location</p>
                <p style={{ textAlign: 'center' }}>{unit.address}</p>
            </div>
        )
    })

    return <section className={styles['segment']}>{content}</section>
}

export default CompareLocation
