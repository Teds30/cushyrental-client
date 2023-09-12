import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useImageManager from '../../../../hooks/data/image-hook';
import SecondaryButton from '../../../../components/Button/SecondaryButton';

import styles from './EditUnit.module.css';
import stars from '../../../../../src/assets/stars.svg';
import { BiSolidEdit } from "react-icons/bi";

const UnitImage = (props) => {
    const { unitImages } = props;

    console.log(unitImages.length)

    const { fetchImage } = useImageManager();
    const [image, setImage] = useState(null); // Initialize to null

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(unitImages[0].image);
                setImage(res);
            } catch (err) {
                console.error(err);
            }
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
                <img src={image} alt="" />
                <div className={`${styles['image-chip']}`}>
                    <p>1 of { unitImages.length }</p>
                </div>
                <div className={`${styles['edit-image-button']}`}>
                    <SecondaryButton leftIcon={<BiSolidEdit size={20} />}><p>Edit images</p></SecondaryButton>
                </div>
            </div>
        </div>
    );
};

export default UnitImage;
