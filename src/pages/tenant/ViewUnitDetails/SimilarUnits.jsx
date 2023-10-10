import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect, Fragment } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Rating from "@mui/material/Rating";

import CardShadow from "../../../components/Card/CardShadow";
import useUnitManager from "../../../hooks/data/units-hook";
import useImageManager from "../../../hooks/data/image-hook";

import { EffectCoverflow } from "swiper/modules";

import "./SimilarUnits.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import photo from "../../../assets/Units/pics.png";
import { GrGallery } from "react-icons/gr";

import { Pagination } from "swiper/modules";
import Inclusions from "./Inclusions";
import Bookmark from "./Bookmark";

export default function SimilarUnits(props) {
    const { fetchUnits } = useUnitManager();
    const { fetchImage } = useImageManager();
    const navigate = useNavigate();

    const [units, setUnits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const viewUnitHandler = () => {
        navigate("/unit/4");
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                setIsLoading(true);
                const res = await fetchUnits();

                const units = await Promise.all(
                    res.map(async (unit) => {
                        const images = unit.images.filter(
                            (image) => image.is_thumbnail === 1
                        );

                        if (images.length > 0) {
                            const image = await fetchImage(
                                images[0].image.replace("images/", "")
                            );
                            console.log(image);
                            return { ...unit, thumbnail_image: image };
                        }
                        return unit;
                    })
                );
                console.log(units)
                setUnits(units);
                setIsLoading(false);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content =
        units.length !== 0 &&
        units.map((unit) => (
            <SwiperSlide key={unit.id} className="similar-unit-swiper-slide">
                <CardShadow style={{ padding: "0" }}>
                    <div className="unit-detials-col">
                        <div className="unitImage">
                            <img src={unit.thumbnail_image} alt={unit.name} />
                            <div className="similar-unit-bookmark">
                                <Bookmark/>
                                {/* <BookmarkBorderIcon style={{ fill: "green" }} /> */}
                            </div>
                            <div className="units">
                                <GrGallery
                                    style={{
                                        height: "14px",
                                        width: "14px",
                                        fill: "var(--border-color)",
                                    }}
                                />
                                <p className="smaller-text">{unit.images.length}</p>
                            </div>
                        </div>

                        <div className="unit-main">
                            <p className="title" style={{ fontSize: "12px" }}>
                                PHP {unit.price}
                            </p>
                            <p
                                className="pre-title"
                                style={{
                                    fontWeight: "400",
                                    fontSize: "11px",
                                }}
                            >
                                {unit.name}
                            </p>

                            <div className="rating">
                                <p
                                    className="caption"
                                    style={{ fontSize: "10px" }}
                                >
                                    Rating
                                </p>

                                <Rating
                                    name="disabled"
                                    value={unit.average_rating}
                                    disabled
                                    sx={{
                                        color: "var(--accent)",
                                        fontSize: "10px",
                                        "& svg": {
                                            fill: "var(--accent)",
                                        },
                                    }}
                                />
                            </div>

                            <div className="similar-unit-view-button">
                                <div className="similar-unit-inclusions">
                                    <Inclusions inclusions={unit.inclusions} />
                                </div>

                                <Link
                                    className="view-unit-button"
                                    to={`/unit/${unit.id}`}
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardShadow>
            </SwiperSlide>
        ));

    return (
        <Fragment>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="similar-unit-swiper"
                style={{ transform: "0" }}
            >
                {content}
            </Swiper>
        </Fragment>
    );
}
