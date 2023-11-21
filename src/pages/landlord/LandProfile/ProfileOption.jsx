import { Link } from 'react-router-dom'

import styles from './LandLordProfile.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
// import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import SubscriptionIcon from './SubscriptionIcon'
import { BiBuildingHouse } from 'react-icons/bi'

const ProfileOption = (props) => {
    const { user_type_id } = props
    return (
        <div {...props} className={`${styles['profile-container']}`}>
            <Link to="/profile/user_profile" className={styles.col}>
                <PersonOutlineIcon
                    style={{
                        color: 'var(--fc-strong)',
                        height: '30px',
                        width: '30px',
                    }}
                />
                <p className="smaller-text">My Profile</p>
            </Link>

            {user_type_id === 2 && (
                <Link to="/manage_subscriptions" className={styles.col}>
                    <SubscriptionIcon/>
                    <p className="smaller-text">Subscription</p>
                </Link>
            )}

            {user_type_id === 2 && (
                <Link to="/myunit-landlord" className={styles.col}>
                    <BiBuildingHouse
                        style={{
                            color: 'var(--fc-strong)',
                            height: '30px',
                            width: '30px',
                        }}
                    />
                    <p className="smaller-text">My Unit</p>
                </Link>
            )}
        </div>
    )
}

export default ProfileOption
