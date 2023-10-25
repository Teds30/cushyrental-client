import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

// import useImageManager from "../../hooks/data/image-hook";

import styles from '../../../components/Chips/ChipButton.module.css'
// import "../../../components/Chips/chip.css";

const RadiusChip = (props) => {
    const {
        items = [],
        button = 'checkbox',
        clickable = true,
        selected = [],
    } = props

    const [chips, setChips] = useState(selected.length !== 0 ? selected : [])

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
                // icon={
                //     <div
                //         dangerouslySetInnerHTML={{
                //             __html: item.icon,
                //         }}
                //     />
                // }
                label={item.name}
                sx={{
                    padding: '8px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '500',
                    fontSize: '16px',
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

export default RadiusChip
