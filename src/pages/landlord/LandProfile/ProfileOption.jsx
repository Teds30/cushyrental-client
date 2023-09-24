import { Link } from 'react-router-dom';

import styles from './LandLordProfile.module.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { BiBuildingHouse } from "react-icons/bi";

const ProfileOption = (props) => {
    return (
        <div {...props} className={`${styles['profile-container']}`}>
            <Link to='/profile/edit/1' className={styles.col}>
                <PersonOutlineIcon style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text'>My Profile</p>
            </Link>

            <Link className={styles.col}>
                <SubscriptionsIcon style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text'>Subscription</p>
            </Link>

            <Link className={styles.col}>
                <BiBuildingHouse style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text'>My Unit</p>
            </Link>
        </div>
    );
};

export default ProfileOption;