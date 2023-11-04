import React, { useEffect, useState } from "react";
import useImageManager from "../../../hooks/data/image-hook";

const RentedUnitImage = (props) => {
    const { images } = props;
    const { fetchImage, isLoading } = useImageManager();
    const [unitPhoto, setUnitPhoto] = useState("");

    console.log(images);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(images.image.replace("images/", ""));
                setUnitPhoto(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);


    return !isLoading && unitPhoto !== '' && (

            <img
                src={unitPhoto === "" ? photo : unitPhoto}
                alt=""
                // alt={images.umit.images.image.name}
            />
    );
};

export default RentedUnitImage;
