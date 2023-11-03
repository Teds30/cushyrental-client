import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import styles from './SelectChips.module.css'

const SelectChips = (props) => {
    const {
        items = [],
        button = 'checkbox',
        clickable = true,
        expenseId,
        selected = [],
    } = props

    const [chips, setChips] = useState(selected ?? [])

    const handleClick = (id) => {
        if (button === 'checkbox') {
            if (chips.includes(id)) {
                if (chips.length !== 1) {
                    setChips(chips.filter((chipId) => chipId !== id))
                    props.onChipValue(
                        expenseId,
                        chips.filter((chipId) => chipId !== id)
                    )
                }
            } else {
                setChips((prev) => {
                    return [...prev, id]
                })
                props.onChipValue(expenseId, [...chips, id])
            }
        } else {
            setChips([id])
            props.onChipValue(expenseId, [id])
        }
    }

    const content = items.map((item) => {
        return (
            <Chip
                key={item.id}
                variant="outlined"
                label={item.name}
                sx={{
                    padding: '8px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '500',
                    background: chips.includes(item.id)
                        ? 'rgba(3, 176, 119, 0.08)'
                        : 'inherit',
                    color: chips.includes(item.id)
                        ? 'var(--accent)'
                        : '#8A93A6',
                    border: chips.includes(item.id)
                        ? '1px solid var(--accent)'
                        : '1px solid inherit',
                    '& svg': {
                        fill: chips.includes(item.id)
                            ? 'var(--accent)'
                            : '#8A93A6',
                        height: '14px',
                        width: '14px',
                    },
                    '& span': {
                        padding: '0',
                    },
                    '&.MuiChip-clickable:hover': {
                        background: 'rgba(3, 176, 119, 0.08)', // Remove hover background
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

export default SelectChips
