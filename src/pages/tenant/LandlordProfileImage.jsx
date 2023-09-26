import React, { useState, useEffect } from "react";
import styles from "./ViewProfile.module.css";
import useImageManager from "../../hooks/data/image-hook";

const LandlordProfileImage = (props) => {
    const { image } = props;
    const { fetchImage, isLoading } = useImageManager();
    const [imageData, setImageData] = useState([]);

    // console.log(image);
    // console.log(imageData);

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const res = await fetchImage(image.replace("images/", ""));
                // console.log(res);
                setImageData(res);
            } catch (error) {
                console.error("Error fetching images:", error.message);
            }
        };

        fetchImagesData();
    }, []);

    return (
        <div className={`${styles["image-container"]} `}>
            {imageData.length !== 0 && <img src={imageData} alt="Unit" />}
        </div>
    );
};

export default LandlordProfileImage;
