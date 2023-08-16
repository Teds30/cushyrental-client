import React from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

const TextFieldAdorned = (props) => {
    const { label = 'label', adornment = '₱', type } = props
    return (
        <FormControl {...props}>
            <InputLabel htmlFor="outlined-adornment">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment"
                // type={type}
                {...props}
                type="number"
                startAdornment={
                    <InputAdornment position="start">
                        {adornment}
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}

export default TextFieldAdorned
