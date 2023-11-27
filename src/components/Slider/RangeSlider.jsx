import * as React from 'react'
import Slider, { SliderThumb } from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import TextFieldAdorned from '../../components/TextFieldAdorned/TextFieldAdorned'
import styles from './RangeSlider.module.css'

function valuetext(value) {
    return value
}

const PrettoSlider = styled(Slider)({
    color: 'var(--accent)',
    height: '15px',
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'var(--accent)',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            color: 'var(--accent)',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
})

const minDistance = 1000

const RangeSlider = (props) => {
    const { priceRange } = props

    const [sliderValue, setSliderValue] = React.useState(
        priceRange ?? [1000, 5000]
    )

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 10000 - minDistance)
                setSliderValue([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(newValue[1], minDistance)
                setSliderValue([clamped - minDistance, clamped])
            }
        } else {
            setSliderValue(newValue)
        }

        props.onRangeValue(newValue)
    }

    return (
        // temporary size
        <Box sx={{ width: '100%' }}>
            <div className={styles.slider}>
                <div className={`${styles['slider-content']}`}>
                    <TextFieldAdorned
                        adornment="PHP"
                        label="Minimum"
                        value={sliderValue[0]}
                        onChange={(e) => {
                            setSliderValue((prev) => {
                                return [e.target.value, prev[1]]
                            })
                        }}
                    />
                    <TextFieldAdorned
                        adornment="PHP"
                        label="Maximum"
                        value={sliderValue[1]}
                        onChange={(e) => {
                            setSliderValue((prev) => {
                                return [prev[0], e.target.value]
                            })
                        }}
                    />
                </div>
                <PrettoSlider
                    value={sliderValue}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    max={10000}
                    disableSwap
                />
            </div>
        </Box>
    )
}

export default RangeSlider
