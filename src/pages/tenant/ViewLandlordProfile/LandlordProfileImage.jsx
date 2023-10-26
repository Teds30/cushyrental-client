import React, { useState, useEffect } from "react";
import styles from "./ViewProfile.module.css";
import useImageManager from "../../../hooks/data/image-hook";

const LandlordProfileImage = (props) => {
    const { image } = props;
    const { fetchAvatar, isLoading } = useImageManager();
    const [imageData, setImageData] = useState([]);

    // console.log(image);
    // console.log(imageData);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchAvatar("default/1.png");
                setImageData(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={`${styles["image-container"]} `}>
            {imageData.length !== 0 && <img src={imageData} alt="Unit" />}
        </div>
    );
};

export default LandlordProfileImage;
