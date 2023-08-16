import React from 'react'

import Popover from '@mui/material/Popover'
import BorderlessButton from './BorderlessButton'
import { BsChevronDown } from 'react-icons/bs'

const PopoverButton = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <div>
            <BorderlessButton
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                rightIcon={<BsChevronDown />}
            >
                {props.children}
            </BorderlessButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                Testing pop
            </Popover>
        </div>
    )
}

export default PopoverButton
