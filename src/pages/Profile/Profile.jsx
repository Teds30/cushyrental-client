import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import AuthContext from '../../context/auth-context'
import ProfileDesign from './ProfileDesign'
import BorderedButton from '../../components/Button/BorderedButton'
import ProfileOption from '../landlord/LandProfile/ProfileOption'
import useImageManager from '../../hooks/data/image-hook'
import TenantProfileOption from '../tenant/TenantProfile/TenantProfileOption'

import styles from './Profile.module.css'
import VerifiedIcon from '@mui/icons-material/Verified'
import { FiChevronLeft } from 'react-icons/fi'
import { LiaScrollSolid } from 'react-icons/lia'
import logo from '../../assets/cushyrental.svg'
import RulesAndRegulationIcon from './RulesAndRegulationIcon'
import UserAvatar from '../../components/Avatar/UserAvatar'

const Profile = () => {
    const userCtx = useContext(AuthContext)
    const [image, setImage] = useState()
    const navigate = useNavigate()

    const logoutHandler = (event) => {
        event.preventDefault()
        userCtx.onLogout()
        navigate('/signin')
    }

    return (
        <div className={`${styles['profile-container']}`}>
            <ProfileDesign className={`${styles['profile-design']}`} />

            <Box className={`${styles['top-back-container']} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        // backgroundColor: '#fff',
                        backgroundColor: 'var(--bg)',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                        // borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar className={`${styles['toolbar-container']}`}>
                        <Link
                            to={`/manage_unit/`}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/')
                                // navigate(-1)
                            }}
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
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box className={`${styles['edit-feature-title']}`}>
                            <p className="title">PROFILE</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles['profile-main']}`}>
                <div className={`${styles['profile-user']}`}>
                    {userCtx.user && (
                        <div className={`${styles['user-profile']}`}>
                            <div className={`${styles['photo']}`}>
                                <UserAvatar
                                    avatar_url={
                                        userCtx.user &&
                                        userCtx.user.profile_picture_img
                                    }
                                    size="80px"
                                />
                            </div>
                            <div className={`${styles['user']}`}>
                                <div className={styles.name}>
                                    <p
                                        className="title"
                                        style={{ fontSize: '16px' }}
                                    >
                                        {userCtx.user.first_name}{' '}
                                        {/* {userCtx.user.middle_name !==
                                            'middle_name' &&
                                            userCtx.user.middle_name}{' '} */}
                                        {userCtx.user.last_name}
                                    </p>
                                    {userCtx.user.is_verified &&
                                        userCtx.user.user_type_id == 2 && (
                                            <VerifiedIcon
                                                style={{
                                                    color: 'var(--accent)',
                                                }}
                                            />
                                        )}
                                </div>
                                {userCtx.user.user_type_id == 3 ? (
                                    <p>Tenant</p>
                                ) : userCtx.user.user_type_id == 2 ? (
                                    <p>Landlord</p>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    )}

                    <div className={`${styles['user-menu']}`}>
                        {userCtx.user && userCtx.user.user_type_id == 2 ? (
                            <ProfileOption
                                user_type_id={
                                    userCtx.user && userCtx.user.user_type_id
                                }
                                className={`${styles['profile-option']}`}
                            />
                        ) : (
                            <TenantProfileOption
                                user_type_id={
                                    userCtx.user && userCtx.user.user_type_id
                                }
                                className={`${styles['profile-option']}`}
                            />
                        )}
                    </div>
                </div>

                <div className={`${styles['about-section']}`}>
                    <p className="title" style={{ fontSize: '16px' }}>
                        Abouts
                    </p>

                    <div className={styles['hr']}></div>

                    <div className={`${styles['about-row']}`}>
                        <Link
                            to={`/about`}
                            className={`${styles['about-col']}`}
                        >
                            <div className={`${styles['about-image']}`}>
                                <img src={logo} alt="CushyRental" />
                            </div>
                            <p className="smaller-text">CushyRental</p>
                        </Link>

                        <Link to="/rules" className={`${styles['about-col']}`}>
                            <div className={`${styles['about-rule']}`}>
                                <div className={`${styles['rule']}`}>
                                    <RulesAndRegulationIcon />
                                    {/* <LiaScrollSolid
                                        style={{
                                            height: '44px',
                                            width: '44px',
                                            fill: 'var(--accent',
                                        }}
                                    /> */}
                                </div>
                            </div>
                            <p className="smaller-text">Rules and Regulations</p>
                        </Link>
                    </div>
                </div>

                <div className={`${styles['profile-button']}`}>
                    <Link>
                        <BorderedButton
                            onClick={logoutHandler}
                            btnType="danger"
                            width="100%"
                        >
                            Logout
                        </BorderedButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile
