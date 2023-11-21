import React, { useState, useEffect, useContext } from "react";
import { Link, navigate } from "react-router-dom";
import styles from "./RentedUnit.module.css";

import Status from "./RentedUnitStatus";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { TbMapPin } from "react-icons/tb";

import SwipeableCard from "../../../components/SwipeableCard/SwipeableCard";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import RentedUnitRating from "./RentedUnitRating";
import TextField from "../../../components/TextField/TextField";
import useNotistack from "../../../hooks/notistack-hook";
import RentedUnitImage from "./RentedUnitImage";
import AuthContext from "../../../context/auth-context";
import RentedUnitRatingStar from "./RentedUnitStar";

const RentedUnit = (props) => {
    const { rental, onSubmittedReview, onRefresh } = props;
    const { notify } = useNotistack();
    const authCtx = useContext(AuthContext);

    // console.log(rental);

    const [open, setOpen] = useState();
    const [selectedRental, setSelectedRental] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [environmentRating, setEnvironmentRating] = useState(5);
    const [boardingHouseRating, setBoardingHouseRating] = useState(5);
    const [landlordRating, setLandlordRating] = useState(5);
    const [isTextFieldEmpty, setIsTextFieldEmpty] = useState(true);
    const [submittedReview, setSubmittedReview] = useState(null);

    const wordLimit = 100;

    const ratingValue = rental.unit.rentals
        .map((rental) => {
            return rental.reviews.filter((review) => {
                return review.user_id === authCtx.user.id && review.star;
            });
        })
        .shift();

    // console.log("value", ratingValue);
    // console.log("rentalId", rental.id);
    // console.log(rentals);

    const handleRateUnitClick = () => {
        onRateUnitClick(rental);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.length <= wordLimit || value.length < inputValue.length) {
            setInputValue(value);
            setIsTextFieldEmpty(value.trim() === "" || value.length === 0);
        }
    };

    const handleRatingChange = (category, value) => {
        switch (category) {
            case "environment":
                setEnvironmentRating(value);
                break;
            case "boardingHouse":
                setBoardingHouseRating(value);
                break;
            case "landlord":
                setLandlordRating(value);
                break;
            default:
                break;
        }
    };

    const toggleDrawer = (newOpen, unit) => () => {
        setSelectedRental(unit);
        setOpen(newOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const handleSubmit = async (rentalId) => {
        const averageStar = Math.round(
            (environmentRating + boardingHouseRating + landlordRating) / 3
        );

        const formData = {
            user_id: authCtx.user.id,
            rental_id: rentalId,
            environment_star: environmentRating,
            unit_star: boardingHouseRating,
            landlord_star: landlordRating,
            message: inputValue,
            star: averageStar,
        };

        // console.log(averageStar);
        // console.log(inputValue);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/reviews`,
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setSubmittedReview(data);
            onSubmittedReview(data);
            // console.log("saving");
            onRefresh();

            notify("Review sent successfully", "success");

            setOpen(false);

            setInputValue("");
            setEnvironmentRating(5);
            setBoardingHouseRating(5);
            setLandlordRating(5);
        } catch (err) {
            console.error("Error submitting review:", err);
        }
    };

    const onRateUnitClick = (rental) => {
        setSelectedRental(rental);
        setOpen(true);
    };

    const imageThumbnail = rental.unit.images
        .filter((image, index) => image.is_thumbnail === 1)
        .shift();
        
    return (
        <div className={`${styles["previews-unit"]} `}>
            <div className={`${styles["previews-unit-data"]} `}>
                <div className={`${styles["image-unit_data"]} `}>
                    <RentedUnitImage
                        images={
                            imageThumbnail !== undefined
                                ? imageThumbnail
                                : rental.unit.images[0]
                        }
                    />
                </div>
                <div className={`${styles["text-unit_data"]} `}>
                    <Status unitRequestStatus={rental.date_end} />
                    <p className={`${styles["text-name_data"]} `}>
                        {rental.unit.name}
                    </p>
                    <p className={`${styles["text-address_data"]} `}>
                        <TbMapPin
                            style={{
                                fill: "transparent",
                                paddingRight: "2px",
                                fontSize: "14px",
                                marginTop: "-3px",
                            }}
                        />
                        {rental.unit.address}
                    </p>
                    <p className={`${styles["text-price_data"]} `}>
                        {" "}
                        ₱ {rental.unit.price}
                    </p>
                </div>
            </div>
            {rental.date_end == null &&
                ratingValue &&
                ratingValue.length > 0 && (
                    <div className={`${styles["ratingunit-container"]} `}>
                        <div className={`${styles["rated-container"]} `}>
                            <p>RATE</p>
                        </div>
                        <div className={`${styles["star-container"]} `}>
                            <RentedUnitRatingStar
                                average_ratings={ratingValue
                                    .map((r) => r.star)
                                    .shift()}
                            />
                        </div>
                    </div>
                )}

            {rental.date_end == null && ratingValue.length === 0 && (
                <div className={`${styles["rate-unit-button"]}`}>
                    <PrimaryButton width="100%" onClick={handleRateUnitClick}>
                        Rate Unit
                    </PrimaryButton>
                </div>
            )}

            <SwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
            >
                <div style={{ padding: "20px" }}>
                    <div className={`${styles["main-swipe-container"]}`}>
                        <div className={`${styles["top-swipe-container"]}`}>
                            <div>
                                <h2>Rate Unit</h2>
                            </div>
                            <div>
                                <BorderlessButton
                                    onClick={() =>
                                        handleSubmit(selectedRental.id)
                                    }
                                    disabled={isTextFieldEmpty}
                                >
                                    Submit
                                </BorderlessButton>
                            </div>
                        </div>
                        <div className={`${styles["unit-swipe-container"]}`}>
                            <div
                                className={`${styles["image-swipe-container"]}`}
                            >
                                <img src="" alt="" />
                            </div>
                            <div
                                className={`${styles["text-swipe-container"]}`}
                            >
                                <p
                                    className={`${styles["details-text-container"]}`}
                                >
                                    {selectedRental.unit &&
                                        selectedRental.unit.details}
                                </p>
                                <p className="caption">
                                    Php{" "}
                                    {selectedRental.unit &&
                                        selectedRental.unit.price}{" "}
                                    /Month
                                </p>
                            </div>
                        </div>
                        <div className={`${styles["rating-swipe-container"]}`}>
                            <div className={`${styles["details-container"]}`}>
                                <div className={`${styles["left-text"]}`}></div>
                                <div className={`${styles["right-text"]}`}>
                                    <p>Terrible</p>
                                    <p>Poor</p>
                                    <p>Fair</p>
                                    <p>Good</p>
                                    <p>Amazing</p>
                                </div>
                            </div>
                            <div className={`${styles["rating-container"]}`}>
                                <div
                                    className={`${styles["left-rating-container"]}`}
                                >
                                    <p>Environment</p>
                                    <p>Boarding House</p>
                                    <p>Landlord</p>
                                </div>
                                <div
                                    className={`${styles["right-rating-container"]}`}
                                >
                                    <RentedUnitRating
                                        value={environmentRating}
                                        onRatingChange={(newValue) =>
                                            handleRatingChange(
                                                "environment",
                                                newValue
                                            )
                                        }
                                    />
                                    <RentedUnitRating
                                        value={boardingHouseRating}
                                        onRatingChange={(newValue) =>
                                            handleRatingChange(
                                                "boardingHouse",
                                                newValue
                                            )
                                        }
                                    />
                                    <RentedUnitRating
                                        value={landlordRating}
                                        onRatingChange={(newValue) =>
                                            handleRatingChange(
                                                "landlord",
                                                newValue
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["review-container"]}`}>
                            <p className="title">Write a review</p>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    label="Share your thoughts"
                                    required
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <div
                                                className={`${styles["word-limit"]}`}
                                            >
                                                Words limit: {inputValue.length}{" "}
                                                / 100
                                            </div>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: "12px" },
                                    }}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </SwipeableCard>
        </div>
    );
};

export default RentedUnit;
