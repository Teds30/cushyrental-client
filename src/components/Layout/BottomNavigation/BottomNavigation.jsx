import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
import { FiSearch } from 'react-icons/fi'

import useAuth from '../../../hooks/data/auth-hook'

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
            <Link
                to="/chats"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsChatSquare
                    style={{ fill: 'inherit' }}
                    color="red"
                    size={24}
                />
            </Link>
        ),
        selectedIcon: (
            <Link
                to="/chats"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsChatSquareFill style={{ fill: 'inherit' }} size={24} />
            </Link>
        ),
    },
    {
        name: 'Notification',
        icon: (
            <Link
                to="/notifications"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsBell style={{ fill: 'inherit' }} size={24} />
            </Link>
        ),
        selectedIcon: (
            <Link
                to="/notifications"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsBellFill style={{ fill: 'inherit' }} size={24} />
            </Link>
        ),
    },
    {
        name: 'Profile',
        icon: (
            <Link
                to="/profile"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BiUser
                    style={{
                        fill: 'inherit',
                    }}
                    size={24}
                />
            </Link>
        ),

        selectedIcon: <BiSolidUser style={{ fill: 'inherit' }} size={24} />,
    },
]

const BottomNavigation = (props) => {
    const { current = 0, children, isTenant = false } = props

    const [selected, setSelected] = useState(current)
    const [navData, setNavData] = useState(nav_data)
    const { user } = useAuth()

    const selectHandler = (id) => {
        setSelected(id)
    }

    useEffect(() => {
        const mainNav = !isTenant
            ? {
                  name: 'Calendar',
                  icon: (
                      <Link
                          to="/calendar"
                          style={{
                              display: 'flex',
                              justifyContent: 'centers',
                              alignItems: 'center',
                          }}
                      >
                          <IoIosCalendar size={32} style={{ fill: '#fff' }} />
                      </Link>
                  ),
                  main: true,
              }
            : {
                  name: 'Search',
                  icon: (
                      <Link
                          to="/search"
                          style={{
                              display: 'flex',
                              justifyContent: 'centers',
                              alignItems: 'center',
                          }}
                      >
                          <FiSearch
                              size={32}
                              style={{ color: '#fff', fill: 'transparent' }}
                          />
                      </Link>
                  ),
                  main: true,
              }

        setNavData([...nav_data.slice(0, 2), mainNav, ...nav_data.slice(2)])
    }, [])

    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            {
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
                            {navData.map((data, index) => {
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
            }
            <Toolbar />
            <Container>{children}</Container>
        </React.Fragment>
    )
}

export default BottomNavigation
