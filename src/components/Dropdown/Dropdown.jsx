import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText';

const Dropdown = (props) => {
    const {
        label = 'Dropdown Label',
        items = [],
        fullWidth = false,
        defaultValue = '',
        selected,
        handleSelect = (event) => {},
        disabled = false,
        errorText = undefined
    } = props

    // const [selected, setSelected] = useState()

    // const handleSelect = (e) => {
    //     setSelected(e.target.value)
    // }

    return (
        <FormControl fullWidth={fullWidth} sx={{ minWidth: '120px' }} {...props}>
            <InputLabel id="component-select-label">{label}</InputLabel>
            <Select
                labelId="component-select-label"
                label={label}
                id="component-select"
                onChange={handleSelect}
                displayEmpty
                defaultValue={defaultValue}
                value={selected ? selected : ''}
                disabled={disabled}
            >
                {items &&
                    items.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
            </Select>
            { errorText !== undefined && <FormHelperText>{errorText}</FormHelperText> }
        </FormControl>
    )
}

export default Dropdown
