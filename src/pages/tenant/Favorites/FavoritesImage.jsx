import React, { useEffect, useState } from "react";
import useImageManager from "../../../hooks/data/image-hook";
import no_img from '../../../assets/cushyrental.svg'
const FavoritesImage = (props) => {
    const { images } = props;
    const { fetchImage, isLoading } = useImageManager();
    const [unitPhoto, setUnitPhoto] = useState("");

    // console.log(images)

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(images.image.replace("images/", ""));
                setUnitPhoto(res);
            } catch (err) {}
        };

        if (Object.keys(images).length !== 0) {handleFetch()}
        else {setUnitPhoto(no_img)};
    }, []);


    return !isLoading && unitPhoto !== '' && (

            <img
                src={unitPhoto}
                alt={images.image.name}
            />
    );
};

export default FavoritesImage;
