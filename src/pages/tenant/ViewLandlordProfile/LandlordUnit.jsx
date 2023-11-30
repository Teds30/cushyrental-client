import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import styles from "./ViewProfile.module.css";
import LandlordUnitAttribute from "./LandlordUnitAttribute";
import LandlordUnitImage from "./LandlordUnitImage";
import LandlordUnitRating from "./LandlordUnitRating";
import LandlordProfileBookmark from "./LandlordProfileBookmark";

const LandlordUnit = (props) => {
    const { unit } = props;
    const [isBookmarked, setIsBookmarked] = useState([]);

    // console.log(unit.id)

    const displayAmenities = unit.amenities.slice(0, 1);
    const excessAmenities = unit.amenities.slice(1);

    const imageThumbnail = unit.images
        .filter((image, index) => image.is_thumbnail === 1)
        .shift();

    return (
        <Link
            to={`/unit/${unit.id}`}
            className={`${styles["unit-container"]} `}
        >
            <div className={`${styles["image-unit-container"]} `}>
                <LandlordUnitImage
                    images={
                        imageThumbnail !== undefined
                            ? imageThumbnail
                            : unit.images[0]
                    }
                />
                <div className={`${styles["bookmark-container"]}`}>
                    <LandlordProfileBookmark unitId={unit.id} />
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
                        <p className="smaller-text">{unit.name}</p>
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["rating-container"]} `}>
                    <p>RATING</p>
                    <div className={`${styles["star-container"]} `}>
                        <LandlordUnitRating
                            average_ratings={unit.average_ratings}
                        />
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["amenities-container"]}`}>
                    {displayAmenities.map((amenity) => {
                        return (
                            <LandlordUnitAttribute
                                key={amenity.id}
                                amenity={amenity}
                            />
                        );
                    })}
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
                                        fontSize: "10px",
                                    }}
                                />
                            </Stack>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default LandlordUnit;
