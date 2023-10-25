import { Link } from 'react-router-dom';

import styles from './TenantProfile.module.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Bookmark from './Bookmark';
import RentedUnit from './RentedUnit';

const TenantProfileOption = (props) => {
    return (
        <div {...props} className={`${styles['profile-container']}`}>
            <Link to='/profile/user_profile' className={styles.col}>
                <PersonOutlineIcon style={{color: 'var(--fc-strong)', height: '30px', width: '30px'}} />
                <p className='smaller-text'>My Profile</p>
            </Link>

            <Link className={styles.col}>
                <Bookmark/>
                <p className='smaller-text'>Favorites</p>
            </Link>

            <Link to='/rentedunit' className={styles.col}>
                <RentedUnit/>
                <p className='smaller-text'>Rented Unit</p>
            </Link>
        </div>
    );
};

export default TenantProfileOption;