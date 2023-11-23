import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./SubscriptionStyle.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { FiChevronLeft } from "react-icons/fi";

import styles from "./Subscriptions.module.css";
import SubscriptionCard from "./SubscriptionCard";

import useSubscriptionManager from "../../../hooks/data/subscriptions-hooks";

const Subscriptions = () => {
    const { fetchSubscriptions } = useSubscriptionManager();
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchSubscriptions();
                setSubscriptions(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={styles["container"]}>
            <div className={styles["nav-container"]}>
                <Link
                    to="/manage_unit"
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     navigate(-1);
                    // }}
                    className={`${styles["link-button"]}`}
                >
                    <IconButton size="large" color="inherit" aria-label="menu">
                        <FiChevronLeft
                            style={{
                                color: "var(--fc-strong)",
                                fill: "transparent",
                            }}
                        />
                    </IconButton>
                </Link>
            </div>
            <div className={styles["header-container"]}>
                <h1>Subscription</h1>
                <h3>THE RIGHT PLAN FOR YOUR BUSINESS</h3>
                <p className="smaller-text">
                    Unlock the full potential of your rental business with our
                    subscription plans - the ultimate solution for landlords
                    looking to showcase their properties and attract the perfect
                    tenants!
                </p>
            </div>
            <div className={styles["subscriptions-container"]}>
                <div className={styles["cards-container"]}>
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        spaceBetween={14}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{
                            dynamicBullets: true,
                            dynamicMainBullets: 3,
                        }}
                        autoplay={{ delay: 3000 }}
                        modules={[Pagination]}
                        className="subscription-swiper"
                    >
                        {subscriptions &&
                            subscriptions.map((sub) => (
                                <div>
                                    <SwiperSlide
                                    key={sub.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    className="subscription-swiper-slide"
                                >
                                    <SubscriptionCard subscription={sub} />
                                </SwiperSlide>
                                </div>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;
