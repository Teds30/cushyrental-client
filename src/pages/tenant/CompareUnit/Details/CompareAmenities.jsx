import React, { useEffect, useState } from 'react'

import styles from '../UnitComparing.module.css'

import useHttp from '../../../../hooks/http-hook'
import useImageManager from '../../../../hooks/data/image-hook'
import CompareAttribute from './CompareAttribute'

const CompareAmenities = (props) => {
    const { selectedUnits } = props

    const { fetchIcon } = useImageManager()

    const [attributes, setAttributes] = useState({})

    const loadData = async () => {
        const data = await Promise.all(
            selectedUnits.map(async (unit) => {
                const amenitiesData = await Promise.all(
                    unit.amenities.map(async (amenity, index) => {
                        const icon = await fetchIcon(amenity.icon)
                        return { ...amenity, iconBlob: icon }
                    })
                )

                return { ...unit, attributes: amenitiesData }
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
                attr={{ title: 'Amenities', desc: 'Comforts offered' }}
            />
        </section>
    )
}

export default CompareAmenities
