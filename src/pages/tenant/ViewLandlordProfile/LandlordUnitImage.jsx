import React, { useState, useEffect } from "react";
import useImageManager from "../../../hooks/data/image-hook";
// import photo from "../../../../assets/cushyrental.svg";

import no_img from "../../../assets/cushyrental.svg";

const LandlordUnitImage = (props) => {
    const { images } = props;
    const { fetchImages, fetchImage, isLoading } = useImageManager();
    const [unitPhoto, setUnitPhoto] = useState("");

    // console.log(images);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImage(images.image.image.replace("images/", ""));
                console.log("res:", res);
                setUnitPhoto(res);
            } catch (err) {}
        };

        if (images !== undefined) {
            handleFetch();
        } else {
            setUnitPhoto(no_img);
        }
    }, []);

    return (
        !isLoading &&
        unitPhoto !== "" && (
            <img
                src={unitPhoto === "" ? photo : unitPhoto}
                alt="Unit"
            />
        )
    );
};

export default LandlordUnitImage;
