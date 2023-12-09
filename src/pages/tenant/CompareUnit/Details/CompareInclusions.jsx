import React, { useEffect, useState } from 'react'

import styles from '../UnitComparing.module.css'

import useHttp from '../../../../hooks/http-hook'
import useImageManager from '../../../../hooks/data/image-hook'
import CompareAttribute from './CompareAttribute'

const CompareInclusions = (props) => {
    const { selectedUnits } = props

    const { fetchIcon } = useImageManager()

    const [attributes, setAttributes] = useState([])

    const loadData = async () => {
        const data = await Promise.all(
            selectedUnits.map(async (unit) => {
                const inclusionsData = await Promise.all(
                    unit.inclusions.map(async (inclusion, index) => {
                        const icon = await fetchIcon(inclusion.icon)
                        return { ...inclusion, iconBlob: icon }
                    })
                )

                return { ...unit, attributes: inclusionsData }
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
                attr={{ title: 'Inclusions', desc: 'Services included' }}
            />
        </section>
    )
}

export default CompareInclusions
