import React, { useEffect, useState } from 'react'

import styles from '../UnitComparing.module.css'

import useHttp from '../../../../hooks/http-hook'
import useImageManager from '../../../../hooks/data/image-hook'
import CompareAttribute from './CompareAttribute'

const CompareFacilities = (props) => {
    const { selectedUnits } = props

    const { fetchIcon } = useImageManager()

    const [attributes, setAttributes] = useState([])

    const loadData = async () => {
        const data = await Promise.all(
            selectedUnits.map(async (unit) => {
                const facilitiesData = await Promise.all(
                    unit.facilities.map(async (facility, index) => {
                        const icon = await fetchIcon(facility.icon)
                        return { ...facility, iconBlob: icon }
                    })
                )

                return { ...unit, attributes: facilitiesData }
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
                attr={{ title: 'Facilities', desc: 'Infrastractures provided' }}
            />
        </section>
    )
}

export default CompareFacilities
