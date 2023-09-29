import React from 'react'

import moment from 'moment'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const drawerBleeding = 32
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'var(--bg-layer1)',
}))

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: 'var(--bg-layer4)',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}))
const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

const SwipeableCard = (props) => {
    const { open, onOpen, closeDrawer, children, fullWidth = false } = props

    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        // height: `calc(60% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                        maxWidth: !fullWidth && '768px',
                        margin: 'auto',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={closeDrawer}
                onOpen={onOpen(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: false,
                }}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        height: drawerBleeding,
                        backgroundColor: 'var(--bg-layer1)',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                </StyledBox>
                <StyledBox
                    sx={{
                        position: 'relative',
                        // px: 2,
                        // pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {children}
                </StyledBox>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default SwipeableCard
