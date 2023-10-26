import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import styles from "./UnitAfterSearch.module.css";
import IconButton from "@mui/material/IconButton";

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TbMapPin } from "react-icons/tb";
import ListAfterSearchImage from "./ListAfterSearchImage";

import useImageManager from "../../../hooks/data/image-hook";

const ListAfterSearch = ({ units }) => {
    // const { ListAfterSearch } = props;
    const [isBookmarked, setIsBookmarked] = useState([]);
    const swiperRef = useRef(null);

    const { fetchAvatar, isLoading } = useImageManager();
    const [image, setImage] = useState();

    // console.log(isBookmarked);

    const handleBookmarkClick = (id) => {
        if (isBookmarked.includes(id)) {
            setIsBookmarked(isBookmarked.filter((itemId) => itemId !== id));
        } else {
            setIsBookmarked([...isBookmarked, id]);
        }
    };

    // console.log(units);
    useEffect(() => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            swiper.navigation.update();
        }

        const handleFetch = async () => {
            try {
                const res = await fetchAvatar("default/1.png");
                setImage(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    // console.log(image);
    return (
        // <Link>
        <div className={`${styles["padding-top-container"]} `}>
            {" "}
            {units.map((units) => (
                <div
                    key={units.id}
                    className={`${styles["main-unit-container"]} `}
                    id={`user-${units.id}`}
                >
                    <Link to="">
                        <div className={`${styles["top-unit-container"]} `}>
                            <div className={`${styles["top-image-container"]}`}>
                                <img src={image} alt="" />
                            </div>
                            <p>
                                {units.landlord.fist_name}{" "}
                                {units.landlord.middle_name}{" "}
                                {units.landlord.last_name}
                            </p>
                        </div>
                    </Link>

                    <Link to="">
                        {" "}
                        <div className={`${styles["image-unit-container"]}`}>
                            <div className={`${styles["distance-container"]}`}>
                                <p>{units.distance} m</p>
                            </div>
                            <div style={{ height: "100%" }}>
                                <ListAfterSearchImage images={units.images} />
                            </div>
                        </div>
                    </Link>

                    <div className={`${styles["content-container"]} `}>
                        <Link to="" className={`${styles["main-text-container"]} `}>
                            <div className={`${styles["text-container"]} `}>
                                <div className={`${styles["name-container"]}`}>
                                    <p>{units.name}</p>
                                </div>
                                <div
                                    className={`${styles["address-container"]}`}
                                >
                                    <p>
                                        <TbMapPin
                                            style={{
                                                fill: "transparent",
                                                paddingRight: "3px",
                                            }}
                                        />
                                        {units.address}
                                    </p>
                                </div>
                                <div className={`${styles["price-container"]} `}>
                                <p
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "20px",
                                        color: "var(--accent)",
                                    }}
                                >
                                    ₱{units.price}{" "}
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "var(--fc-body-light)",
                                        }}
                                    >
                                        /month
                                    </span>
                                </p>
                            </div>
                            </div>
                            
                        </Link>

                        <div className={`${styles["bookmark-container"]}`}>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => handleBookmarkClick(units.id)}
                            >
                                {isBookmarked.includes(units.id) ? (
                                    <BsBookmarkFill
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            color: "var(--fc-strong)",
                                            fill: "var(--accent)",
                                        }}
                                    />
                                ) : (
                                    <BsBookmark
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            color: "var(--fc-strong)",
                                            fill: "var(--fc-body)",
                                        }}
                                    />
                                )}
                            </IconButton>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        // </Link>
    );
};

export default ListAfterSearch;
