import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide'

import { styled } from '@mui/material/styles'
import Fab from '@mui/material/Fab'

import { BiUser, BiSolidUser } from 'react-icons/bi'
import {
    BsChatSquare,
    BsChatSquareFill,
    BsBell,
    BsBellFill,
} from 'react-icons/bs'
import { IoIosCalendar } from 'react-icons/io'
import { PiHouseFill, PiHouseLight } from 'react-icons/pi'

function HideOnScroll(props) {
    const { children } = props

    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="up" in={!trigger}>
            {children}
        </Slide>
    )
}

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',

    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'var(--accent)',
    '&:hover': {
        backgroundColor: 'var(--accent)',
    },
})

const itemStyles = {
    color: 'inherit',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // border: '1px solid red',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
}

const nav_data = [
    {
        name: 'Home',
        icon: <PiHouseLight style={{ fill: 'inherit' }} size={24} />,
        selectedIcon: <PiHouseFill style={{ fill: 'inherit' }} size={24} />,
    },
    {
        name: 'Chats',
        icon: (
            <BsChatSquare style={{ fill: 'inherit' }} color="red" size={24} />
        ),
        selectedIcon: (
            <BsChatSquareFill style={{ fill: 'inherit' }} size={24} />
        ),
    },
    {
        name: 'Calendar',
        icon: <IoIosCalendar size={32} style={{ fill: '#fff' }} />,
        main: true,
    },
    {
        name: 'Notification',
        icon: <BsBell size={24} style={{ fill: 'inherit' }} />,
        selectedIcon: <BsBellFill style={{ fill: 'inherit' }} size={24} />,
    },
    {
        name: 'Profile',
        icon: (
            <BiUser
                style={{
                    fill: 'inherit',
                }}
                size={24}
            />
        ),
        selectedIcon: <BiSolidUser style={{ fill: 'inherit' }} size={24} />,
    },
]

const BottomNavigation = (props) => {
    const { children } = props

    const [selected, setSelected] = useState(0)

    const selectHandler = (id) => {
        setSelected(id)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar
                    position="fixed"
                    sx={{
                        background: 'var(--bg-layer1)',
                        color: 'var(--fc-body-light)',
                        top: 'auto',
                        bottom: 0,
                    }}
                >
                    <Toolbar
                        sx={{
                            top: 'auto',
                            bottom: 0,
                            padding: 0,
                        }}
                    >
                        {nav_data.map((data, index) => {
                            const nav_style =
                                index === selected
                                    ? {
                                          ...itemStyles,
                                          color: 'var(--accent)',
                                          fill: 'var(--accent)',
                                      }
                                    : {
                                          ...itemStyles,
                                          color: 'var(--fc-body-light)',
                                          fill: 'var(--fc-body-light)',
                                      }

                            return data.main === true ? (
                                <div key={index} style={{ flex: '1' }}>
                                    <StyledFab
                                        color="secondary"
                                        aria-label="add"
                                    >
                                        {data.icon}
                                    </StyledFab>
                                    <Box sx={itemStyles}>
                                        <Box
                                            sx={{
                                                width: '24px',
                                                height: '24px',
                                            }}
                                        />
                                        {data.name}
                                    </Box>
                                </div>
                            ) : (
                                <Box
                                    sx={nav_style}
                                    key={index}
                                    onClick={() => {
                                        selectHandler(index)
                                    }}
                                >
                                    {index === selected
                                        ? data.selectedIcon
                                        : data.icon}
                                    {data.name}
                                </Box>
                            )
                        })}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container>{children}</Container>
        </React.Fragment>
    )
}

export default BottomNavigation
