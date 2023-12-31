import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import useImageManager from '../../hooks/data/image-hook'

import styles from './ChipButton.module.css'
import './chips.css'

const ChipOutlined = (props) => {
    const {
        items: originalItems = [],
        button = 'checkbox',
        clickable = true,
        selected = [],
    } = props

    const { fetchIcon } = useImageManager()

    const [chips, setChips] = useState(selected.length !== 0 ? selected : [])
    const [items, setItems] = useState([]) // Use state for items

    useEffect(() => {
        const fetchIcons = async () => {
            const iconPromises = originalItems.map(async (item) => {
                try {
                    if (!item.fixedIcon) {
                        const res = await fetchIcon(item.icon)

                        return {
                            ...item,
                            icon: res,
                        }
                    }

                    return { ...item }
                } catch (error) {
                    console.log(error)
                    return null
                }
            })

            const newItems = await Promise.all(iconPromises)
            setItems(newItems)
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

    const content = items.map((item) => {
        return (
            <Chip
                key={item.id}
                variant="outlined"
                icon={
                    item.fixedIcon ? (
                        item.fixedIcon
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.icon,
                            }}
                        />
                    )
                }
                label={item.name}
                sx={{
                    fontFamily: 'inherit',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '400',
                    fontSize: '14px',
                    background: chips.includes(item.id)
                        ? 'rgba(3, 176, 119, 0.08)'
                        : 'inherit',
                    color: chips.includes(item.id)
                        ? 'var(--accent)'
                        : 'var(--fc-body)',
                    border: chips.includes(item.id)
                        ? '1px solid var(--accent)'
                        : '1px solid inherit',
                    '& svg': {
                        color: chips.includes(item.id) && 'var(--accent)',
                        height: '16px',
                        width: '16px',
                        
                    },
                    '& span': {
                        padding: '0',
                    },
                }}
                onClick={clickable ? () => handleClick(item.id) : undefined}
            />
        )
    })

    return (
        <Stack direction="row" spacing={1}>
            <div className={styles.chip}>{content}</div>
        </Stack>
    )
}

export default ChipOutlined
