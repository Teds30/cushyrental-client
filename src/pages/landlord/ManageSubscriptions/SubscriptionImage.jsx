import React, { useEffect, useState } from "react";
import useImageManager from "../../../hooks/data/image-hook";
import no_img from "../../../assets/cushyrental.svg";

const SubscriptionImage = ({ image }) => {
    const { fetchImage } = useImageManager();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const resImage = await fetchImage(image.replace("images/", ""));
                setImageUrl(resImage);
            } catch (err) {}
        };

        if (image) handleFetch();
        else setImageUrl(no_img);
    }, [image, fetchImage]);

    return <img src={imageUrl} alt="" />;
};

export default SubscriptionImage;
