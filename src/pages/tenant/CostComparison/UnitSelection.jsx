import React, { useContext, useEffect, useState } from 'react'

import styles from './UnitSelection.module.css'
import useImageManager from '../../../hooks/data/image-hook'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import ComparisonToolContext from '../../../context/comparison-tool-context'

const UnitSelection = (props) => {
    const { unit, setSelectingUnit, selectingUnit } = props

    const cctool = useContext(ComparisonToolContext)
    const { handleRemoveUnits, selectedUnits } = cctool

    const [unitImg, setUnitImg] = useState()
    const { fetchImage, isLoading } = useImageManager()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(unit.images[0].image)
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

    const handleCheck = () => {
        if (!selectingUnit.includes(unit.id) && selectingUnit.length < 5) {
            setSelectingUnit((prev) => {
                return [...prev, unit.id]
            })
        } else {
            setSelectingUnit((prev) => prev.filter((item) => item !== unit.id))
        }
    }

    const unitStyles = selectingUnit.includes(unit.id)
        ? `${styles['unit']} ${styles['unit-selected']}`
        : styles['unit']

    return (
        <div className={unitStyles}>
            <div className={styles['unit-img']}>
                <img src={unitImg} alt="" />
            </div>
            <div className={styles['unit-details']}>
                <p className="title">{unit.name}</p>
                <p className="caption">₱{formattedPrice}</p>
                <p className="caption">{unit.address}</p>
            </div>
            <div className={styles['checkbox-container']}>
                <Checkbox
                    sx={{
                        border: 'var(--accent)',
                        color: 'var(--accent)',
                        '&.Mui-checked': {
                            color: 'var(--accent)',
                        },
                        '&:hover': {
                            color: 'var(--accent)',
                        },
                    }}
                    checked={selectingUnit.includes(unit.id)}
                    onChange={handleCheck}
                />
            </div>
        </div>
    )
}

export default UnitSelection
