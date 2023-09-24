import React, { useState, useEffect } from "react";
import useImageManager from "../../hooks/data/image-hook";

const LandlordUnitImage = (props) => {
    const { images } = props;
    const { fetchImages, fetchImage } = useImageManager();
    const [imagesData, setImagesData] = useState([]);
    
    // console.log(images);

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const responseData = await fetchImages();
                const filteredImages = responseData.filter((image) => image.id === images.image_id);
                const responseImage = await fetchImage(filteredImages[0].name); 
                console.log(responseImage);
                setImagesData(responseImage);
                
            } catch (error) {
                console.error("Error fetching images:", error.message);
            }
        };


        fetchImagesData();

    }, [fetchImages]);
    

    return (
        <div>
            <img src={imagesData}/>
        </div>
    );
};

export default LandlordUnitImage;
