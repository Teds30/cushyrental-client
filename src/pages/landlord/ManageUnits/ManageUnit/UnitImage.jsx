import { useEffect, useState } from 'react';

import photo from "../../../../assets/cushyrental.svg";
import useImageManager from '../../../../hooks/data/image-hook';

import styles from './ManageUnit.module.css';

const UnitImage = (props) => {
    const imageThumbnail =  props;

    const { fetchImage, fetchImages, isLoading } = useImageManager();

    const [ unitPhoto, setUnitPhoto ] = useState('');

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(imageThumbnail.imageThumbnail.image.image.replace("images/", ""));
                setUnitPhoto(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return !isLoading && unitPhoto !== '' && (
        <div className={`${styles["unit-images"]}`}>
            <img
                src={unitPhoto === "" ? photo : unitPhoto}
                alt={imageThumbnail.imageThumbnail.image.image.name}
            />
        </div>
    );
};

export default UnitImage;
