import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

const RadioButton = (props) => {
    const { items = [], onSelectedValue } = props

    const content = items.map((item) => (
        <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio sx={{ color: 'var(--accent)' }} />}
            label={item.value}
            sx={{
                '& .MuiSvgIcon-root': {
                    color: 'var(--accent)',
                },
            }}
        />
    ))

    const handleChange = (event) => {
        onSelectedValue(event.target.value)
    }

    return (
        <FormControl>
            <RadioGroup
                defaultValue="none"
                name="radio-buttons-group"
                onChange={handleChange}
            >
                {content}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButton
