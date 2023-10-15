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
import useImageManager from "../../../hooks/data/image-hook";
import BorderedButton from "../../../components/Button/BorderedButton";

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

    const { fetchReviews, isLoading } = useUserManager();
    const { fetchImage } = useImageManager();
    const [reviews, setReviews] = useState([]);

    let reviewRating;

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchReviews();

                let reviews = res.filter((review) => review.user_id === userId);

                const promises = reviews.map(async (review) => {
                    const image = await fetchImage(
                        review.user.profile_picture_img.replace("images/", "")
                    );
                    return {
                        ...review,
                        user: { ...review?.user, profilePictureImg: image },
                    };
                });

                reviews = await Promise.all(promises);
                setReviews(reviews);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content = reviews.map((review) => {
        if (Math.trunc(review.star) === 1) {
            reviewRating = "Terrible";
        } else if (Math.trunc(review.star) === 2) {
            reviewRating = "Poor";
        } else if (Math.trunc(review.star) === 3) {
            reviewRating = "Fair";
        } else if (Math.trunc(review.star) === 4) {
            reviewRating = "Good";
        } else {
            reviewRating = "Excellent";
        }

        return (
            <SwiperSlide key={review.id} className="tenant-review-swiper-slide">
                <CardShadow>
                    <div className="review-detials-col">
                        <div className="review-user-profile">
                            <div className="review-image">
                                <img
                                    src={review.user.profilePictureImg}
                                    alt=""
                                />
                            </div>
                            <div className="review-user-data">
                                <p
                                    className="title"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {review.user.first_name}{" "}
                                    {review.user.middle_name}{" "}
                                    {review.user.last_name}
                                </p>
                                <p
                                    className="smaller-text"
                                    style={{
                                        fontSize: "6px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {review.user.user_type_id === 1
                                        ? "Tenant"
                                        : "Landlord"}
                                </p>
                            </div>
                        </div>

                        <div className="review-main">
                            <div className="review-rating">
                                <Rating
                                    value={review.star}
                                    sx={{
                                        fontSize: "10px",
                                        color: "var(--accent)",
                                        "& svg": {
                                            fill: "var(--accent)",
                                        },
                                    }}
                                />
                                {/* <Rating
                                    name="disabled"
                                    value={review.star}
                                    disabled
                                    sx={{
                                        color: "var(--accent)",
                                        fontSize: "10px",
                                        "& svg": {
                                            fill: "var(--accent)",
                                        },
                                    }}
                                /> */}
                                <span
                                    className="smaller-text"
                                    style={{
                                        fontSize: "9px",
                                        fontWeight: "600",
                                    }}
                                >
                                    {reviewRating}
                                </span>
                            </div>

                            <div className="review-message">
                                <p>Hello this is a message..</p>
                            </div>
                        </div>
                    </div>
                </CardShadow>
            </SwiperSlide>
        );
    });

    return reviews.length !== 0 ? (
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
                {content}
            </Swiper>

            <BorderedButton>See More Reviews</BorderedButton>
        </Fragment>
    ) : (
        <p className="cpation" style={{ textAlign: "center" }}>
            No reviews to fecth.
        </p>
    );
}
