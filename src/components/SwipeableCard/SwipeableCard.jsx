import React from 'react'

import moment from 'moment'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

let drawerBleeding = 32
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'var(--bg-layer1)',
}))

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: 'var(--bg-layer4)',
    borderRadius: 3,
    // position: 'absolute',
    // top: 8,
    left: 'calc(50% - 15px)',
}))
const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

const SwipeableCard = (props) => {
    const {
        open,
        onOpen,
        closeDrawer,
        children,
        fullWidth = false,
        title = '',
    } = props

    drawerBleeding = title ? 48 : 32

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
                        background: 'none',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={!!open}
                onClose={closeDrawer}
                onOpen={onOpen}
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
                        // position: 'absolute',
                        // height: drawerBleeding,
                        backgroundColor: 'var(--bg-layer1)',
                        overflow: 'hidden',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '8px',
                        }}
                    >
                        <Puller />
                    </Box>
                    {title && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottom: '1px solid var(--border-color)',
                                paddingBottom: '8px',
                            }}
                        >
                            <p className="title">{title}</p>
                        </Box>
                    )}
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
