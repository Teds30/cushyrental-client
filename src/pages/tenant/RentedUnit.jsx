import React, { useState, useEffect } from "react";
import { Link, navigate } from "react-router-dom";
import styles from "./RentedUnit.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import { FiChevronLeft } from "react-icons/fi";
import SwipeableCard from "../../components/SwipeableCard/SwipeableCard";
import BorderlessButton from "../../components/Button/BorderlessButton";
import RentedUnitRating from "./RentedUnitRating";
import TextField from "../../components/TextField/TextField";

const RentedUnit = () => {
    const [rentals, setRentals] = useState([]);
    const [open, setOpen] = useState();
    const [selectedRental, setSelectedRental] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [environmentRating, setEnvironmentRating] = useState(5);
    const [boardingHouseRating, setBoardingHouseRating] = useState(5);
    const [landlordRating, setLandlordRating] = useState(5);
    const [isTextFieldEmpty, setIsTextFieldEmpty] = useState(true);
    const [submittedReview, setSubmittedReview] = useState(null);

    const wordLimit = 100;

    const formatDate = (dateString) => {
        const date = moment(dateString);
        return date.format("MMMM DD, YYYY");
    };

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/tenant-rentals/2`
                );
                const data = await response.json();
                setRentals(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchRentals();
    }, []);

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
            user_id: 1,
            rental_id: rentalId,
            environment_star: environmentRating,
            unit_star: boardingHouseRating,
            landlord_star: landlordRating,
            message: inputValue,
            star: averageStar,
        };

        console.log(averageStar);
        console.log(inputValue);
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
            console.log("Submitted review data:", data);
        } catch (err) {
            console.error("Error submitting review:", err);
        }
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log("Environment Rating:", environmentRating);
    //     console.log("Boarding House Rating:", boardingHouseRating);
    //     console.log("Landlord Rating:", landlordRating);
    //     console.log("Review:", inputValue);
    // };

    return (
        <div className={`${styles["main-container"]} `}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
                        <Link
                            to=""
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: "var(--fc-strong)",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box sx={{ flexGrow: 1, alignItems: "center" }}>
                            <p className="title">Rented Unit</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["profile-container"]} `}>
                <div className={`${styles["previews-unit"]} `}>
                    {rentals.map((rental) => (
                        <div
                            key={rental.id}
                            className={`${styles["previews-unit-data"]} `}
                        >
                            <div className={`${styles["image-unit_data"]} `}>
                                <img src="" alt="" />
                            </div>
                            <div className={`${styles["text-unit_data"]} `}>
                                <p>{formatDate(rental.date_start)}</p>
                                <p>{rental.unit.name}</p>
                                <p>{rental.unit.address}</p>
                                <div
                                    className={`${styles["rate-unit-button"]}`}
                                >
                                    <button
                                        className={`${styles["rate-unit-button-style"]}`}
                                        onClick={toggleDrawer(true, rental)}
                                    >
                                        Rate Unit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles["bottom-text-container"]}`}>
                <p>No more units found.</p>
            </div>

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
