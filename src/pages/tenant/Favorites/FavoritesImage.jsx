import React, { useEffect, useState } from "react";
import useImageManager from "../../../hooks/data/image-hook";

const FavoritesImage = (props) => {
    const { images } = props;
    const { fetchImage, isLoading } = useImageManager();
    const [unitPhoto, setUnitPhoto] = useState("");

    console.log(images)
    // console.log(imageThumbnail);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(images.image.replace("images/", ""));
                setUnitPhoto(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    // console.log(image);

    return !isLoading && unitPhoto !== '' && (

            <img
                src={unitPhoto === "" ? photo : unitPhoto}
                alt={images.image.name}
            />
    );
};

export default FavoritesImage;
