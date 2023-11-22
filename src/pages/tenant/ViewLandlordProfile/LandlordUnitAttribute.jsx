import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import useImageManager from '../../../hooks/data/image-hook'

const LandlordUnitAttribute = (props) => {
    const { amenity } = props
    const [icon, setIcon] = useState(null)
    const { fetchIcon } = useImageManager()

    useEffect(() => {
        fetchData(amenity.amenity.icon)
    }, [amenity])

    const fetchData = async (name) => {
        const res = await fetchIcon(name)
        setIcon(res)
    }

    return (
        <div>
            {' '}
            <Stack direction="row" spacing={1}>
                <Chip
                    icon={
                        <div
                            dangerouslySetInnerHTML={{
                                __html: icon,
                            }}
                            style={{
                                // backgroundColor: '#D9D9D9',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fill: '#5C6173',
                            }}
                        />
                    }
                    label={amenity.amenity.name}
                    style={{ color: '#8A93A6' }}
                    variant="outlined"
                    sx={{
                        padding: '2px',
                        border: '2px solid #E4E9ED',
                        fontSize: '10px',
                    }}
                />
            </Stack>
        </div>
    )
}

export default LandlordUnitAttribute
