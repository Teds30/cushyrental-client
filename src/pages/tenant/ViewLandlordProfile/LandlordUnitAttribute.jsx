import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import useImageManager from '../../../hooks/data/image-hook'
import styles from './LandlordUnitAttribute.module.css'

const LandlordUnitAttribute = (props) => {
    const { amenity } = props
    const [icon, setIcon] = useState(null)
    const { fetchIcon } = useImageManager()

    useEffect(() => {
        fetchData(amenity.amenity ? amenity.amenity.icon : amenity.icon)
    }, [amenity])

    const fetchData = async (name) => {
        const res = await fetchIcon(name)
        setIcon(res)
    }

    return (
        <div className={styles['amenity-container']}>
            <Stack direction="row" spacing={1} alignItems="center">
                <div
                    dangerouslySetInnerHTML={{
                        __html: icon,
                    }}
                    className={styles['amenity-icon']}
                />
                <div className={styles['amenity-name']}>
                    {amenity.amenity ? amenity.amenity.name : amenity.name}
                </div>
            </Stack>
        </div>
    )
}

export default LandlordUnitAttribute
