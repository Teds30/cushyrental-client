import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useImageManager from '../../../../hooks/data/image-hook';
import SecondaryButton from '../../../../components/Button/SecondaryButton';

import styles from './EditUnit.module.css';
import stars from '../../../../../src/assets/stars.svg';
import { BiSolidEdit } from "react-icons/bi";

const UnitImage = (props) => {
    const { unitImages, unitId } = props;

    const { fetchImage } = useImageManager();
    const [image, setImage] = useState(null); // Initialize to null

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const data = unitImages.filter(image => image.is_thumbnail === 1)
                const res = await fetchImage(data[0].image.replace("images/", ""));
                setImage(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={`${styles['image-container']}`}>
            <div className={`${styles['learn-more']}`}>
                <img src={stars} alt="Stars" />
                <p>Promote this unit to reach more people. <Link to="/somewhere" style={{color: 'var(--accent)'}}> Learn How</Link></p>
                {/* Replace "/somewhere" with the actual path or URL */}
            </div>

            <div className={`${styles['image']}`}>
                <img src={image} alt={unitImages[0].name} />
                <div className={`${styles['image-chip']}`}>
                    <p>1 of { unitImages.length }</p>
                </div>
                <div className={`${styles['edit-image-button']}`}>
                    <Link to={`/manage_unit/edit/images/${unitId}`}><SecondaryButton leftIcon={<BiSolidEdit size={20} />}><p>Edit images</p></SecondaryButton></Link>
                </div>
            </div>
        </div>
    );
};

export default UnitImage;
