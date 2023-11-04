import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import useImageManager from "../../../hooks/data/image-hook";

import "./UnitPhotos.css";
import styles from "./UnitComparison.module.css";

// import required modules
import { Pagination } from "swiper/modules";

export default function UnitPhotos(props) {
    const { images } = props;

    const { fetchImage, isLoading } = useImageManager();

    const [unitImages, setUnitImages] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const promises = images.map(async (image) => {
                    const unitImage = await fetchImage(
                        image.image.replace("images/", "")
                    );
                    return { ...image, image: unitImage };
                });

                const resolvedImages = await Promise.all(promises);
                setUnitImages(resolvedImages);
            } catch (err) {}
        };
        handleFetch();
    }, [images]);

    const content = unitImages.map((image) => (
        <SwiperSlide key={image.id}>
            <img src={image.image} alt="" />
        </SwiperSlide>
    ));

    return (
        <>
            <Swiper
                pagination={true}
                modules={[Pagination]}
                className="unit-comparison-slider"
            >
                {content}
            </Swiper>
        </>
    );
}
