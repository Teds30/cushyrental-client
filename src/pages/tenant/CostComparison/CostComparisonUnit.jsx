import React, { useContext, useEffect, useState } from 'react'

import { FiAlertCircle } from 'react-icons/fi'

import styles from './CostComparison.module.css'
import ComparisonToolContext from '../../../context/comparison-tool-context'
import useImageManager from '../../../hooks/data/image-hook'

const CostComparisonUnit = (props) => {
    const { unit } = props

    const cctool = useContext(ComparisonToolContext)
    const { months } = cctool

    const { fetchImage, isLoading } = useImageManager()
    const [unitImg, setUnitImg] = useState()

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

    // const updatedPrice =
    //     months.length > 0
    //         ? parseFloat(
    //               parseFloat(unit.price) * parseInt(months.length)
    //           ).toLocaleString('en-US', {
    //               minimumFractionDigits: 2,
    //               maximumFractionDigits: 2,
    //           })
    //         : 0
    const formattedPrice = unit.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return (
        <div className={styles['unit-container']}>
            <div className={styles['unit-img']}>
                <img src={unitImg} alt="" />
            </div>
            <div className={styles['unit-details']}>
                <h3 style={{ color: 'var(--accent)' }}>
                    {/* ₱{months.length > 0 ? updatedPrice : formattedPrice} */}
                    ₱{formattedPrice}
                </h3>
                <p className="title">{unit.name}</p>
                <div
                    className="caption"
                    style={{
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <FiAlertCircle
                            size={'14px'}
                            style={{
                                fill: 'transparent',
                            }}
                        />
                    </span>
                    <p>
                        Price may vary based on any additional bills incurred.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CostComparisonUnit
