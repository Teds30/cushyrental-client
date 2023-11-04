import React from 'react'

import Fab from '@mui/material/Fab'
import { useTheme } from '@mui/material/styles'
import Zoom from '@mui/material/Zoom'
import { green } from '@mui/material/colors'

const FloatingActionButton = (props) => {
    const { children, size, variant = 'circular', onClick = () => {} } = props

    const fabStyle = {
        backgroundColor: 'var(--accent)',
        fontWeight: '500',
        position: 'fixed',
        bottom: 16,
        right: 16,
        color: '#fff',
        bgcolor: 'var(--accent)',
        '&:hover': {
            bgcolor: 'var(--accent)',
        },
        // textTransform: 'unset',
    }

    const theme = useTheme()
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    }
    return (
        <Zoom
            key={1}
            in={true}
            timeout={transitionDuration}
            style={{
                transitionDelay: `${transitionDuration.exit}ms`,
            }}
            onClick={onClick}
            unmountOnExit
        >
            <Fab
                size={size}
                // color="primary"
                sx={fabStyle}
                variant={variant}
            >
                {children}
            </Fab>
        </Zoom>
    )
}

export default FloatingActionButton
