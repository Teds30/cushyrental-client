import { useEffect, useState } from "react";

import photo from "../../../assets/Units/pics.png";
import useImageManager from "../../../hooks/data/image-hook";

const UnitBookmarkPhoto = (props) => {
    const {images, length} = props;

    const { fetchImage, fetchImages, isLoading } = useImageManager();

    const [unitPhoto, setUnitPhoto] = useState("");

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(
                    images.image.replace("images/", "")
                );
                setUnitPhoto(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        !isLoading &&
        unitPhoto !== "" && (
            <img
                src={unitPhoto === "" ? photo : unitPhoto}
                alt={images.name}
            />
        )
    );
};

export default UnitBookmarkPhoto;
