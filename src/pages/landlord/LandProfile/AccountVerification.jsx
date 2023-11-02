import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import AccountVerificationDesign from './AccountVerificationDesign'
import AccountVerificationProcess from './AccountVerificationProcess'
import { VerifyAccountContextProvider } from '../../../context/verify-account-context'

import styles from './AccountVerification.module.css'
import { FiChevronLeft } from 'react-icons/fi'

const AccountVerification = () => {
    const [scrolling, setScrolling] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolling(true)
            } else {
                setScrolling(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrolling])

    return (
        <VerifyAccountContextProvider>
            <div className={`${styles['account-verification-container']}`}>
                <AccountVerificationDesign />
                <Box
                    className={`${styles['top-back-container']} ${
                        scrolling ? styles['scrolling'] : ''
                    }`}
                >
                    <AppBar
                        position="static"
                        sx={{
                            margin: 0,
                            background: 'transparent',
                            color: 'var(--fc-body)',
                            fontFamily: 'Inter',
                            boxShadow: 'none',
                        }}
                    >
                        <Toolbar className={`${styles['toolbar-container']}`}>
                            <Link
                                to={`/profile/user_profile`}
                                className={`${styles['link-button']}`}
                            >
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                >
                                    <FiChevronLeft
                                        style={{
                                            color: "var(--bg-layer1)",
                                            fill: "transparent",
                                            color: scrolling ? "black" : "white",
                                        }}
                                    />
                                </IconButton>
                            </Link>
                            <Box className={`${styles['edit-feature-title']}`}>
                                <p
                                    className="title"
                                    style={{
                                        color: !scrolling
                                            ? 'var(--bg-layer1)'
                                            : 'black',
                                    }}
                                >
                                    Account Verification
                                </p>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>

                <AccountVerificationProcess
                    className={`${styles['account-verification-process']}`}
                />
            </div>
        </VerifyAccountContextProvider>
    )
}

export default AccountVerification
