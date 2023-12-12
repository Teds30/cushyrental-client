import React, { useContext, useEffect, useState } from 'react'

import styles from './CompareUnitSelection.module.css'
import useImageManager from '../../../hooks/data/image-hook'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import ComparisonToolContext from '../../../context/comparison-tool-context'

const CompareUnitSelection = (props) => {
    const { unit, selectedUnits = [], setSelectingUnit, selectingUnit } = props

    const cctool = useContext(ComparisonToolContext)

    const [unitImg, setUnitImg] = useState()
    const { fetchImage, isLoading } = useImageManager()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(
                    unit.images
                        .sort((a, b) => b.is_thumbnail - a.is_thumbnail)[0]
                        .image.replace('images/', '')
                )
                setUnitImg(res)
            } catch (err) {
                console.log(err)
            }
        }
        if (unit.images[0]) handleFetch()
    }, [unit])

    const formattedPrice = unit.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const isSelected =
        selectedUnits.length > 0 &&
        selectedUnits.filter((item) => item.id === unit.id).length > 0

    const handleCheck = () => {
        if (!isSelected) setSelectingUnit(unit)
    }

    const isDisabledStyle = !!isSelected && styles['disabled']
    const unitStyles =
        selectingUnit?.id === unit.id
            ? `${styles['unit']} ${styles['unit-selected']}`
            : styles['unit']

    return (
        <div
            className={`${unitStyles} ${isDisabledStyle}`}
            onClick={handleCheck}
        >
            <div className={styles['unit-img']}>
                <img src={unitImg} alt="" />
            </div>
            <div className={styles['unit-details']}>
                <p className="title">{unit.name}</p>
                <p className="caption">₱{formattedPrice}</p>
                <p className="caption">{unit.address}</p>
            </div>
        </div>
    )
}

export default CompareUnitSelection
