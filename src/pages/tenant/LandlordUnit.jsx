import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styles from "./ViewProfile.module.css";
import LandlordUnitAttribute from "./LandlordUnitAttribute.jsx";
import LandlordUnitImage from "./LandlordUnitImage";
import LandlordUnitRating from "./LandlordUnitRating";

const LandlordUnit = (props) => {
    const { unit } = props;
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    const displayAmenities = unit.amenities.slice(0, 1);
    const excessAmenities = unit.amenities.slice(1);

    return (
        <div
            key={unit.id}
            className={`${styles["unit-container"]} `}
            id={`user-${unit.id}`}
        >
            <div className={`${styles["image-unit-container"]} `}>
                <LandlordUnitImage images={unit.images[0]} />
                <div className={`${styles["bookmark-container"]}`}>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleBookmarkClick}
                            >
                                {isBookmarked ? (
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
            <div className={`${styles["content-container"]} `}>
                <div className={`${styles["text-container"]} `}>
                    <div className={`${styles["top-text-container"]} `}>
                        <div className={`${styles["left-side"]} `}>
                            <p>Php {unit.price}</p>
                        </div>
                    </div>

                    <div className={`${styles["name-container"]}`}>
                        <p>{unit.name}</p>
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["rating-container"]} `}>
                    <p >RATING</p>
                    <div className={`${styles["star-container"]} `}>
                        <LandlordUnitRating
                            average_ratings={unit.average_ratings}
                        />
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["amenities-container"]}`}>
                    {displayAmenities.map((amenity) => (
                        <LandlordUnitAttribute
                            key={amenity.id}
                            amenity={amenity}
                        />
                    ))}
                    {excessAmenities.length > 0 && (
                        <div>
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label={`+${excessAmenities.length} more`}
                                    style={{ color: "#8A93A6" }}
                                    variant="outlined"
                                    sx={{
                                        padding: "2px 0px",
                                        border: "2px solid #E4E9ED",
                                        fontSize: "10px"
                                    }}
                                />
                            </Stack>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandlordUnit;
