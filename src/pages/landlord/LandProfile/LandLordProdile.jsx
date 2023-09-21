import { Link } from 'react-router-dom';

import styles from './LandLordProfile.module.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { BiBuildingHouse } from "react-icons/bi";

const LandLordProfile = () => {
    return (
        <div className={`${styles['profile-container']}`}>
            <Link className={styles.col}>
                <PersonOutlineIcon style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text' style={{fontSize: '12px'}}>My Profile</p>
            </Link>

            <Link className={styles.col}>
                <SubscriptionsIcon style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text' style={{fontSize: '12px'}}>Subscription</p>
            </Link>

            <Link className={styles.col}>
                <BiBuildingHouse style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text' style={{fontSize: '12px'}}>My Unit</p>
            </Link>
        </div>
    );
};

export default LandLordProfile;