import React, { useEffect, useState } from 'react'

import styles from '../UnitComparing.module.css'

import useHttp from '../../../../hooks/http-hook'
import useImageManager from '../../../../hooks/data/image-hook'
import CompareAttribute from './CompareAttribute'

const CompareRules = (props) => {
    const { selectedUnits } = props

    const { fetchIcon } = useImageManager()

    const [attributes, setAttributes] = useState([])

    const loadData = async () => {
        const data = await Promise.all(
            selectedUnits.map(async (unit) => {
                const rulesData = await Promise.all(
                    unit.rules.map(async (rule, index) => {
                        const icon = await fetchIcon(rule.icon)
                        return { ...rule, iconBlob: icon }
                    })
                )

                return { ...unit, attributes: rulesData }
            })
        )
        setAttributes({ unit: data })
    }

    useEffect(() => {
        if (selectedUnits) loadData()
    }, [selectedUnits])

    return (
        <section className={styles['segment']}>
            <CompareAttribute
                data={attributes}
                attr={{ title: 'Rules', desc: 'Guidelines and Regulations' }}
            />
        </section>
    )
}

export default CompareRules
