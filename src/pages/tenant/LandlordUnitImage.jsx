import React, { useState, useEffect } from "react";
import styles from "./ViewProfile.module.css";
import useImageManager from "../../hooks/data/image-hook";

const LandlordUnitImage = (props) => {
    const { images } = props;
    const { fetchImages, fetchImage } = useImageManager();
    const [imagesData, setImagesData] = useState([]);


    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const responseData = await fetchImages();
                const filteredImages = responseData.filter(
                    (image) => image.id === images.image_id
                );
                const responseImage = await fetchImage(filteredImages[0].image);
                // console.log(responseImage);
                setImagesData(responseImage);
            } catch (error) {
                console.error("Error fetching images:", error.message);
            }
        };

        fetchImagesData();
    }, [fetchImages]);

    return (
        <div>
            {imagesData && (
                <img
                    src={imagesData}
                    alt="Unit"
                    className={styles["unit-image"]}
                />
            )}
        </div>
    );
};

export default LandlordUnitImage;
