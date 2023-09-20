import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { BsBookmark } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import styles from "./ViewProfile.module.css";
import LandlordUnitAttribute from "./LandlordUnitAttribute.jsx";

const LandlordUnit = (props) => {
    const { unit } = props;

    return (
        <div
            key={unit.id}
            className={`${styles["unit-container"]} `}
            id={`user-${unit.id}`}
        >
            <div className={`${styles["image-unit-container"]} `}>
                <img src={unit.images.id} alt="Unit" />
            </div>
            <div className={`${styles["content-container"]} `}>
                <div className={`${styles["text-container"]} `}>
                    <div className={`${styles["left-side"]} `}>
                        <p className={styles["price"]}>Php {unit.price}</p>
                        <p>{unit.name}</p>
                    </div>
                    <div>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                        >
                            <BsBookmark
                                style={{
                                    marginRight: "-16px",
                                    color: "var(--fc-strong)",
                                    fill: "var(--accent)",
                                }}
                            />
                        </IconButton>
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["rating-container"]} `}>
                    <p>RATING</p>
                    <div className={`${styles["star-container"]} `}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["amenities-container"]}`}>
                    {(unit.amenities) && unit.amenities.map((amenity) => (
                        <LandlordUnitAttribute key = {amenity.id} amenity={amenity} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandlordUnit;
