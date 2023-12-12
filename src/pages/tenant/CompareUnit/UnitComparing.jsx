import React, { useContext } from 'react'

import styles from './UnitComparing.module.css'
import BorderlessButton from '../../../components/Button/BorderlessButton'
import CompareUnitContext from '../../../context/compareunit-context'
import CompareUnitImage from './Details/CompareUnitImage'

const UnitComparing = () => {
    const cu_tool = useContext(CompareUnitContext)

    const { selectedUnits, handleSelectUnits, handleRemoveUnit } = cu_tool

    let content = selectedUnits?.map((unit, index) => {
        return (
            <div className={styles['unit']} key={index}>
                <div className={styles['unit-details']}>
                    <CompareUnitImage unit={unit} />
                    <p
                        className={styles['title']}
                        style={{ textAlign: 'center' }}
                    >
                        {unit.name}
                    </p>
                </div>
                <div className={styles['actions']}>
                    <BorderlessButton
                        className={styles['title']}
                        btnType="danger"
                        onClick={() => {
                            handleRemoveUnit(unit.id)
                        }}
                    >
                        Remove
                    </BorderlessButton>
                </div>
            </div>
        )
    })

    return <section className={styles['segment']}>{content}</section>
}

export default UnitComparing
