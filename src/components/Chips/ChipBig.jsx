import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import useImageManager from '../../hooks/data/image-hook'

import styles from './ChipButton.module.css'

const ChipBig = (props) => {
    const {
        items: originalItems = [], // Rename originalItems to avoid conflicts
        button = 'checkbox',
        clickable = true,
        background = 'success',
        selected = [],
    } = props

    const { fetchIcon } = useImageManager()

    const [chips, setChips] = useState(selected.length !== 0 ? selected : [])
    const [items, setItems] = useState([]) // Use state for items

    useEffect(() => {
        const fetchIcons = async () => {
            const iconPromises = originalItems.map(async (item) => {
                try {
                    const res = await fetchIcon(item.icon)
                    return {
                        ...item,
                        icon: res,
                    }
                } catch (error) {
                    console.log(error)
                    return null
                }
            })

            const newItems = await Promise.all(iconPromises)
            setItems(newItems) // Update items using state
        }

        fetchIcons()
    }, [originalItems, fetchIcon])

    const handleClick = (id) => {
        if (button === 'checkbox') {
            if (chips.includes(id)) {
                setChips(chips.filter((chipId) => chipId !== id))
                props.onChipValue(chips.filter((chipId) => chipId !== id))
            } else {
                setChips([...chips, id])
                props.onChipValue([...chips, id])
            }
        } else {
            setChips([id])
            props.onChipValue([id])
        }
    }

    const colorStyle =
        background === 'success' ? 'var(--accent)' : 'var(--accent-danger)'
    const borderShadowStyle =
        background === 'success'
            ? '0px 0px 0px 5px rgba(3, 176, 119, 0.20)'
            : '0px 0px 0px 5px rgba(235, 88, 88, 0.20)'

    const content = items.map((item) => (
        <Chip
            key={item.id}
            variant="outlined"
            icon={
                <div
                    dangerouslySetInnerHTML={{
                        __html: item.icon,
                    }}
                />
            } // Create an img element for the icon
            label={items.find((i) => i.id === item.id)?.name || ''}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                height: 'auto',
                padding: '8px 0',
                width: '150px',
                fontWeight: '500',
                fontSize: '14px',
                background: chips.includes(item.id) ? colorStyle : 'inherit',
                color: chips.includes(item.id) ? '#fff' : 'inherit',
                border: chips.includes(item.id)
                    ? '1px solid ' + colorStyle
                    : '1px solid inherit',
                boxShadow: chips.includes(item.id)
                    ? borderShadowStyle
                    : 'inherit',
                '& svg': {
                    color: chips.includes(item.id) && '#fff',
                    height: '32px',
                    width: '32px',
                },
                '&:hover': {
                    background:
                        chips.includes(item.id) &&
                        'rgba(var(--accent-rgb), .8) !important',
                },
            }}
            onClick={clickable ? () => handleClick(item.id) : undefined}
        />
    ))

    return (
        <Stack direction="row" spacing={1}>
            <div className={styles.chip}>{content}</div>
        </Stack>
    )
}

export default ChipBig
