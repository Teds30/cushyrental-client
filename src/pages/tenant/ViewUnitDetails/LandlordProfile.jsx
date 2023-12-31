import { useState, useEffect } from 'react'

import useImageManager from '../../../hooks/data/image-hook'

import styles from './ViewUnitDetails.module.css'
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified'
import UserAvatar from '../../../components/Avatar/UserAvatar'

const LandlordProfile = (props) => {
    const { user } = props
    const { fetchAvatar, isLoading } = useImageManager()

    const [landlord, setLandlord] = useState(user || {})

    const [lastActiveTimestamp, setLastActiveTimestamp] = useState(
        landlord.updated_at
    )
    const [timeElapsed, setTimeElapsed] = useState('')

    useEffect(() => {
        const now = new Date()
        const lastActive = new Date(lastActiveTimestamp)
        const elapsedMilliseconds = now - lastActive

        const seconds = Math.floor(elapsedMilliseconds / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        let message = 'Active '
        if (days > 0) {
            message += `${days} day${days > 1 ? 's' : ''} `
        } else if (hours > 0) {
            message += `${hours} hour${hours > 1 ? 's' : ''} `
        } else {
            message += 'less than an hour '
        }
        message += 'ago'

        setTimeElapsed(message)
    }, [lastActiveTimestamp])

    return (
        !isLoading && (
            <div className={`${styles['profile']}`}>
                <UserAvatar
                    avatar_url={landlord.profile_picture_img}
                    size="60px"
                />

                <div className={`${styles['user-data']}`}>
                    <div className={`${styles['user-data-name']}`}>
                        <p
                            className="title"
                            style={{ color: 'var(--fc-strong)' }}
                        >
                            {landlord.first_name} {landlord.last_name}
                        </p>
                        {landlord.is_verified && (
                            <VerifiedIcon
                                sx={{
                                    height: '18px',
                                    width: '18px',
                                    fill: 'var(--accent)',
                                }}
                            />
                        )}
                    </div>

                    {/* <p className="smaller-text" style={{ fontSize: "10px" }}>
                        {timeElapsed}
                    </p> */}

                    <div className={`${styles['landlord-address']}`}>
                        <CiLocationOn
                            style={{ height: '11px', width: '11px' }}
                        />
                        <p
                            className="smaller-text"
                            style={{ fontSize: '10px' }}
                        >
                            {landlord.address}
                        </p>
                    </div>
                </div>

                <div className={`${styles['view-profile']}`}>
                    <Link
                        to={`/viewprofile/${user.id}`}
                        className={`${styles['view-profile-button']}`}
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        )
    )
}

export default LandlordProfile
