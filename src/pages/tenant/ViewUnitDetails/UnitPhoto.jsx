import React, { useRef, useState, Fragment, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import useImageManager from "../../../hooks/data/image-hook";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./UnitPhoto.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function UnitPhoto(props) {
    const { images } = props;
    const { fetchImage, isLoading } = useImageManager();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [unitImages, setUnitImages] = useState([]);

    const imageContent1 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide key={index}>
                <img src={image} />
            </SwiperSlide>
        ));
    const imageContent2 =
        !isLoading &&
        unitImages.map((image, index) => (
            <SwiperSlide key={index}>
                <img src={image} />
            </SwiperSlide>
        ));

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const promises = images.map(async (image) => {
                    const unitImage = await fetchImage(
                        image.image.replace("images/", "")
                    );
                    return unitImage;
                });

                const resolvedImages = await Promise.all(promises);
                setUnitImages(resolvedImages);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <Fragment>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {imageContent1}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {imageContent2}
            </Swiper>
        </Fragment>
    );
}
