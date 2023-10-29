import React, { useEffect, useState } from "react";
import useImageManager from "../../../hooks/data/image-hook";

const FavoritesImage = (props) => {
    const { images } = props;
    const { fetchImage, isLoading } = useImageManager();
    const [unitPhoto, setUnitPhoto] = useState("");

    const [image, setImage] = useState(
        images.filter((image) => image.is_thumbnail === 1).shift()
    );

    console.log(image);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                // const res = await fetchImage();
                // const filteredImages = image.map((image) => {
                //     return res.find((photo) => photo.id === image.id) || null;
                // });

                const imagePhoto = await fetchImage(
                    image.image.image.replace("images/", "")
                );

                setUnitPhoto(imagePhoto);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
            <img src={unitPhoto} alt={images.name} />
        
    );
};

export default FavoritesImage;
