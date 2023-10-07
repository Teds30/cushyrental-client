import React, { useContext, useEffect, useState } from 'react'

import useHttp from '../../../hooks/http-hook'
import { TbBuildingCommunity, TbArrowRight } from 'react-icons/tb'
import { BsPerson } from 'react-icons/bs'

import BottomNavigation from '../../../components/Layout/BottomNavigation/BottomNavigation'

import brand_logo from '../../../assets/cushyrental.svg'

import styles from './Dashboard.module.css'

import profile from '../../../assets/Units/pics.png'
import { Link } from 'react-router-dom'

import AuthContext from '../../../context/auth-context'

const Dashboard = () => {
    const authCtx = useContext(AuthContext)

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

            setUpcomingDues(res2)
        }

        changeUser()
    }, [authCtx])

    const { sendRequest } = useHttp()

    const [unitStats, setUnitStats] = useState()
    const [upcomingDues, setUpcomingDues] = useState()

    return (
        <React.Fragment>
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
                            <div className={styles['count-container']}>
                                Units
                                <h1>{unitStats && unitStats.units_count}</h1>
                            </div>
                        </div>
                        <div className={styles['status-container']}>
                            <div className={styles['status']}>
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.listed_count}
                                </h3>
                                <p>Listed</p>
                            </div>
                            <div className={styles['status-vr']}></div>
                            <div className={styles['status']}>
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.unlisted_count}
                                </h3>
                                <p>Unlisted</p>
                            </div>
                            <div className={styles['status-vr']}></div>
                            <div className={styles['status']}>
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.occupied_count}
                                </h3>
                                <p>Occupied</p>
                            </div>
                            <div className={styles['status-vr']}></div>
                            <div className={styles['status']}>
                                <h3 className={styles['count']}>
                                    {unitStats && unitStats.pending_count}
                                </h3>
                                <p>Pending</p>
                            </div>
                        </div>
                        <Link to="/manage_unit">
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
                            <div className={styles['count-container']}>
                                Tenants
                                <h1>{unitStats && unitStats.tenants_count}</h1>
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
                <div className={styles['events-container']}>
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
                                                <div
                                                    className={
                                                        styles['tenant-img']
                                                    }
                                                >
                                                    <img src={profile} alt="" />
                                                </div>
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

            <BottomNavigation current={0} />
        </React.Fragment>
    )
}

export default Dashboard
