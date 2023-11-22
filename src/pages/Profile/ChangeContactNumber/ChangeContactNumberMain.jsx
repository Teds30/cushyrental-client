import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'

import { FiChevronLeft } from 'react-icons/fi'
import { useState } from 'react'
import ChangeContactNumber from './ChangeContactNumber'
import AuthContext from '../../../context/auth-context'

import styles from './ChangeContactNumber.module.css'
import ChangeContactNumberPassword from './ChangeContactNumberPassword'
import ChangeContactNumberOtp from './ChangeContactNumberOtp'

import useHttp from '../../../hooks/http-hook'

const ChangeContactNumberMain = () => {
    const { sendRequest, isLoading } = useHttp()
    const [step, setStep] = useState(1)
    const userCtx = useContext(AuthContext)
    const [number, setNumber] = useState('')

    const numberHandler = async (number) => {
        
        // REMOVE COMMENT FOR LIVE

        // const res = await sendRequest({
        //     url: `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/request_otp`,
        //     method: 'POST',
        //     body: JSON.stringify({ number: number }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })

        // remove || true for live
        if (res.status === 'pending' || true) {
            setStep(step + 1)
            setNumber(number)
        }

        setStep(step + 1)
        setNumber(number)
    }

    const AuthenticatedUser = () => {
        setStep(step + 1)
    }

    let content

    if (step === 1) {
        content = <ChangeContactNumber onNumber={numberHandler} />
    } else if (step === 2) {
        userCtx.user.is_social && AuthenticatedUser()
        content = (
            <ChangeContactNumberPassword
                user={userCtx.user}
                onAuthenticatedUser={AuthenticatedUser}
            />
        )
    } else {
        content = (
            <ChangeContactNumberOtp
                user={{ ...userCtx.user, phone_number: number }}
                token={userCtx.token}
            />
        )
    }
    // else if (step === 2) {
    //     content = (
    //         <ForgotPassword email={user.email} onVerified={verifiedHandler} />
    //     );
    // } else {
    //     content = <ForgotPasswordUpdatePassword user={user} />;
    // }

    return (
        <div className={`${styles['main-container']}`}>
            <Box className={`${styles['top-back-container']} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: '#fff',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                        <Link to={`/profile/user_profile`}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box sx={{ flexGrow: 1 }}>
                            <p className="title">CHANGE CONTACT NUMBER</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {content}
        </div>
    )
}

export default ChangeContactNumberMain
