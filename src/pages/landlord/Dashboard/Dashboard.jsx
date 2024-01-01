import React, { useContext, useEffect, useState } from 'react'
import Tour from 'reactour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import useHttp from '../../../hooks/http-hook'
import { TbBuildingCommunity, TbArrowRight } from 'react-icons/tb'
import { BsPerson } from 'react-icons/bs'

import BottomNavigation from '../../../components/Layout/BottomNavigation/BottomNavigation'

import brand_logo from '../../../assets/cushyrental.svg'

import styles from './Dashboard.module.css'

import profile from '../../../assets/Units/pics.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import AuthContext from '../../../context/auth-context'
import UserAvatar from '../../../components/Avatar/UserAvatar'

import PrimaryButton from '../../../components/Button/PrimaryButton'
import BorderedButton from '../../../components/Button/BorderedButton'
import BorderlessButton from '../../../components/Button/BorderlessButton'

import { Backdrop, Box, Card, CardActions, CardContent } from '@mui/material'
import CreateUnitTour from './Tours/CreateUnitTour'
import DashboardTour from './Tours/DashboardTour'

import { steps } from './dashboard_steps'

const Dashboard = () => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const receivedState = location.state

    const [unitStats, setUnitStats] = useState()
    const [upcomingDues, setUpcomingDues] = useState()
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [openNextTour, setOpenNextTour] = useState(false)
    const [isUnitTourOpen, setIsUnitTourOpen] = useState(false)
    const [open, setOpen] = useState(receivedState?.isFresh || false)
    const [unitOpen, setUnitOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleUnitClose = () => {
        setUnitOpen(false)
    }

    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)

    useEffect(() => {
        const changeUser = () => {
            if (authCtx.user) {
                fetchData(authCtx.user.id)
            }
        }

        const fetchData = async (userId) => {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/landlord_units_stats/${userId}`,
            })

            setUnitStats(res)

            const res2 = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/landlord_upcoming_events/${userId}`,
            })

            const upCommingDues = res2.filter(
                (rental) =>
                    rental.rental_status !== 4 &&
                    rental.rental_status !== 3 &&
                    rental.rental_status !== 2
            )

            console.log(upCommingDues)

            setUpcomingDues(upCommingDues)
            // setUnitStats(upCommingDues.length)
        }

        changeUser()
    }, [authCtx])

    useEffect(() => {
        if (unitStats && unitStats.units_count == 0) {
            // setIsTourOpen(true)
        }
    }, [unitStats])

    const { sendRequest } = useHttp()

    return (
        <React.Fragment>
            <DashboardTour
                open={open}
                handleClose={handleClose}
                setIsTourOpen={setIsTourOpen}
            />

            <CreateUnitTour
                open={unitOpen}
                handleClose={handleUnitClose}
                setIsTourOpen={setIsUnitTourOpen}
            />

            <Tour
                steps={steps}
                isOpen={isTourOpen}
                onRequestClose={() => setIsTourOpen(false)}
                accentColor="var(--accent)"
                badgeContent={(curr, tot) => `${curr}/${tot}`}
                showNumber={true}
                showNavigation={false}
                showNavigationNumber={true}
                rounded={10}
                lastStepNextButton={
                    <PrimaryButton
                        onClick={() => {
                            setOpenNextTour(true)
                        }}
                    >
                        Next
                    </PrimaryButton>
                }
                // onAfterOpen={disableBody}
                // onBeforeClose={enableBody}
            />
            <div className={styles['container']}>
                <div className={styles['brand-container']}>
                    <img src={brand_logo} alt="logo" width="64" height="64" />
                    <div className={styles['brand-label']}>CushyRental</div>
                </div>
                <div className={styles['card-container']}>
                    <div className={styles['card']}>
                        <div className={styles['card-content']}>
                            <div className={styles['icon-container']}>
                                <div className={styles['gradient']}>
                                    <div
                                        className={`${styles['gradient-shape']} ${styles['blue-box']}`}
                                    >
                                        <div className={styles['icon']}>
                                            <TbBuildingCommunity
                                                size={24}
                                                style={{
                                                    fill: 'transparent',
                                                    strokeWidth: 2,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={styles['count-container']}
                                id="total_units_count"
                            >
                                Units
                                <h1>{unitStats && unitStats.units_count}</h1>
                            </div>
                        </div>
                        <div className={styles['status-container']}>
                            <div
                                className={styles['status']}
                                id="listed_units_count"
                            >
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.listed_count}
                                </h3>
                                <p>Listed</p>
                            </div>
                            <div className={styles['status-vr']}></div>
                            <div
                                className={styles['status']}
                                id="unlisted_units_count"
                            >
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.unlisted_count}
                                </h3>
                                <p>Unlisted</p>
                            </div>
                            <div className={styles['status-vr']}></div>
                            <div
                                className={styles['status']}
                                id="occupied_units_count"
                            >
                                <h3 className={styles['count']}>
                                    {upcomingDues !== undefined
                                        ? upcomingDues.length
                                        : 0}
                                </h3>
                                <p>Occupied</p>
                            </div>
                            <div className={styles['status-vr']}></div>
                            <div
                                className={styles['status']}
                                id="pending_units_count"
                            >
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.pending_count}
                                </h3>
                                <p>Pending</p>
                            </div>
                        </div>
                        <Link
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/manage_unit')
                            }}
                            id="action_manage_units"
                        >
                            <div className={styles['action']}>
                                <div className={styles['action-label']}>
                                    Manage Units
                                </div>
                                <span>
                                    <TbArrowRight size={20} />
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['card']}>
                        <div className={styles['card-content']}>
                            <div className={styles['icon-container']}>
                                <div className={styles['gradient']}>
                                    <div
                                        className={`${styles['gradient-shape']} ${styles['green-box']}`}
                                    >
                                        <div className={styles['icon']}>
                                            <BsPerson
                                                size={24}
                                                style={{
                                                    fill: '#fff',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={styles['count-container']}
                                id="tenants_count"
                            >
                                Tenants
                                <h1>{upcomingDues && upcomingDues.length}</h1>
                            </div>
                        </div>

                        <Link to="/myunit-landlord/managerenters">
                            <div className={styles['action']}>
                                <div className={styles['action-label']}>
                                    Manage Tenants
                                </div>
                                <span>
                                    <TbArrowRight size={20} />
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div
                    className={styles['events-container']}
                    id="upcoming_due_dates"
                >
                    <h3>Upcoming Due Date</h3>
                    <div className={styles['events']}>
                        {upcomingDues &&
                            upcomingDues.map((event) => {
                                let currency = Intl.NumberFormat('en-US')
                                return (
                                    <div
                                        className={styles['event']}
                                        key={event.id}
                                    >
                                        <div className={styles['event-date']}>
                                            <div className={styles['day']}>
                                                {event.dayOfWeek}
                                            </div>
                                            <div className={styles['date']}>
                                                {event.due_date}
                                            </div>
                                        </div>
                                        <div
                                            className={styles['event-content']}
                                        >
                                            <p className="title">
                                                {event.unit.name}
                                            </p>
                                            <p className={styles['price']}>
                                                ₱
                                                {currency.format(
                                                    event.monthly_amount
                                                )}
                                            </p>
                                            <div className={styles['tenant']}>
                                                <UserAvatar
                                                    avatar_url={
                                                        event.user
                                                            .profile_picture_img
                                                    }
                                                    size="24px"
                                                />
                                                {`${event.user.first_name} ${event.user.last_name}`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        {upcomingDues && upcomingDues.length === 0 && (
                            <p style={{ textAlign: 'center' }}>
                                No upcoming due dates.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <BottomNavigation
                current={0}
                openNextTour={openNextTour}
                isUnitTourOpen={isUnitTourOpen}
                setIsUnitTourOpen={setIsUnitTourOpen}
                setUnitOpen={setUnitOpen}
            />
        </React.Fragment>
    )
}

export default Dashboard
