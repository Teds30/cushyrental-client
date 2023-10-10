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
import useUserManager from "../../../hooks/data/users-hook";

import { EffectCoverflow } from "swiper/modules";

import "./TenantReviews.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import photo from "../../../assets/Units/pics.png";
import { GrGallery } from "react-icons/gr";

import { Pagination } from "swiper/modules";
import Inclusions from "./Inclusions";
import Bookmark from "./Bookmark";

export default function TenantReviews(props) {
    const { userId } = props;

    // console.log(userId);

    const { fetchReviews, isLoading } = useUserManager();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchReviews();
                // console.log(res.filter(review => review.user_id === userId));
                setReviews(res.filter((review) => review.user_id === userId));
            } catch (err) {}
        };
        handleFetch();
    }, []);

    // const content =
    //     reviews.length !== 0 &&
    //     reviews.map((unit) => (
    //         <SwiperSlide key={unit.id} className="tenant-review-swiper-slide">
    //             <CardShadow>
    //                 <div className="review-detials-col">
    //                     <div className="review-user-profile">
    //                         <div className="review-image">
    //                             <img src={photo} alt="" />
    //                         </div>
    //                         <div className="review-user-data">
    //                             <p
    //                                 className="title"
    //                                 style={{
    //                                     fontSize: "12px",
    //                                     fontWeight: "500",
    //                                 }}
    //                             >
    //                                 Jano Otilla
    //                             </p>
    //                             <p
    //                                 className="smaller-text"
    //                                 style={{
    //                                     fontSize: "6px",
    //                                     fontWeight: "500",
    //                                 }}
    //                             >
    //                                 Landlord
    //                             </p>
    //                         </div>
    //                     </div>

    //                     <div className="review-main">
    //                         <div className="review-rating">
    //                             <Rating
    //                                 name="disabled"
    //                                 value={4}
    //                                 disabled
    //                                 sx={{
    //                                     color: "var(--accent)",
    //                                     fontSize: "10px",
    //                                     "& svg": {
    //                                         fill: "var(--accent)",
    //                                     },
    //                                 }}
    //                             />
    //                             <span
    //                                 className="smaller-text"
    //                                 style={{
    //                                     fontSize: "9px",
    //                                     fontWeight: "600",
    //                                 }}
    //                             >
    //                                 Excellent
    //                             </span>
    //                         </div>

    //                         <div className="review-message">
    //                             <p>Hello this is a message..</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </CardShadow>
    //         </SwiperSlide>
    //     ));

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
                className="tenant-review-swiper"
                style={{ transform: "0" }}
            >
                {/* {content} */}

                <SwiperSlide
                    // key={unit.id}
                    className="tenant-review-swiper-slide"
                >
                    <CardShadow>
                        <div className="review-detials-col">
                            <div className="review-user-profile">
                                <div className="review-image">
                                    <img src={photo} alt="" />
                                </div>
                                <div className="review-user-data">
                                    <p
                                        className="title"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Jano Otilla
                                    </p>
                                    <p
                                        className="smaller-text"
                                        style={{
                                            fontSize: "6px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Landlord
                                    </p>
                                </div>
                            </div>

                            <div className="review-main">
                                <div className="review-rating">
                                    <Rating
                                        name="disabled"
                                        value={4}
                                        disabled
                                        sx={{
                                            color: "var(--accent)",
                                            fontSize: "10px",
                                            "& svg": {
                                                fill: "var(--accent)",
                                            },
                                        }}
                                    />
                                    <span
                                        className="smaller-text"
                                        style={{
                                            fontSize: "9px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Excellent
                                    </span>
                                </div>

                                <div className="review-message">
                                    Hello this is a message..
                                </div>
                            </div>
                        </div>
                    </CardShadow>
                </SwiperSlide>

                <SwiperSlide
                    // key={unit.id}
                    className="tenant-review-swiper-slide"
                >
                    <CardShadow>
                        <div className="review-detials-col">
                            <div className="review-user-profile">
                                <div className="review-image">
                                    <img src={photo} alt="" />
                                </div>
                                <div className="review-user-data">
                                    <p
                                        className="title"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Jano Otilla
                                    </p>
                                    <p
                                        className="smaller-text"
                                        style={{
                                            fontSize: "6px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Landlord
                                    </p>
                                </div>
                            </div>

                            <div className="review-main">
                                <div className="review-rating">
                                    <Rating
                                        name="disabled"
                                        value={4}
                                        disabled
                                        sx={{
                                            color: "var(--accent)",
                                            fontSize: "10px",
                                            "& svg": {
                                                fill: "var(--accent)",
                                            },
                                        }}
                                    />
                                    <span
                                        className="smaller-text"
                                        style={{
                                            fontSize: "9px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Excellent
                                    </span>
                                </div>

                                <div className="review-message">
                                    Hello this is a message..
                                </div>
                            </div>
                        </div>
                    </CardShadow>
                </SwiperSlide>
            </Swiper>
        </Fragment>
    );
}
