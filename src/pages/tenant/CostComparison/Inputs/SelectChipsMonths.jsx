import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import styles from './SelectChips.module.css'
import moment from 'moment'

const SelectChipsMonths = (props) => {
    const {
        items = [],
        button = 'checkbox',
        clickable = true,
        selected = [],
        expenseId,
    } = props

    const [chips, setChips] = useState([])

    useEffect(() => {
        let idArray = []
        for (const month of selected) {
            idArray.push(month.id)
        }
        setChips(idArray)
    }, [selected])

    const handleClick = (item) => {
        if (button === 'checkbox') {
            if (chips.includes(item.id)) {
                if (selected.length !== 1) {
                    setChips(chips.filter((chipId) => chipId !== item.id))
                    props.onChipValue(
                        expenseId,
                        selected.filter((chipId) => chipId.id !== item.id)
                    )
                }
            } else {
                setChips((prev) => {
                    return [...prev, item.id]
                })
                props.onChipValue(expenseId, [...selected, item])
            }
        } else {
            setChips([item.id])
            props.onChipValue(expenseId, [item.id])
        }
    }

    const content = items.map((item) => {
        const momentDate = moment(`${item.year}-${item.month}`, 'YYYY-MM')
        const monthName = momentDate.format('MMMM')

        return (
            <Chip
                key={item.id}
                variant="outlined"
                label={monthName}
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
                onClick={clickable ? () => handleClick(item) : undefined}
            />
        )
    })

    return (
        <Stack direction="row" spacing={1}>
            <div className={styles.chip}>{content}</div>
        </Stack>
    )
}

export default SelectChipsMonths
