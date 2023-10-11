import React, { useState, useEffect } from "react";
import styles from "./UnitDetails.module.css";
import moment from "moment";
import SwipeableCard from "../../components/SwipeableCard/SwipeableCard";
import BorderedButton from "../../components/Button/BorderedButton";
import useAuth from "../../hooks/data/auth-hook";
import UnitReply from "./UnitReply";

const UnitDetails = () => {
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState();
    const [showLandlordReply, setShowLandlordReply] = useState({});
    const [selectedSort, setSelectedSort] = useState("all");
    const { user } = useAuth();

    const loggedInUserId = user ? user.id : null;

    // console.log(loggedInUserId);
    // console.log(user);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/unit_reviews/3`
                );
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const handleSendClick = async (reviewId, landlordReply) => {

        const replyData = {
            review_id: reviewId,
            landlord_reply: landlordReply,
        };

        console.log(landlordReply);
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/reviews-landlord-reply`,
                {
                    method: "POST",
                    body: JSON.stringify(replyData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                console.log("Reply sent successfully!");
            } else {
                console.error("Failed to send reply");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };



    const toggleShowLandlordReply = (reviewId) => {
        setShowLandlordReply((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const handleSortClick = (value) => {
        if (value === "all") {
            setSelectedSort("all");
        } else {
            setSelectedSort(value);
        }
    };

    const filteredReviews = reviews
        .filter((review) => {
            if (selectedSort === "all") {
                return true;
            } else {
                const selectedRating = parseFloat(selectedSort);
                return review.star === selectedRating;
            }
        })
        .sort((a, b) => {
            if (selectedSort === "all") {
                // return a.star - b.star;
                return moment(b.created_at).unix() - moment(a.created_at).unix();
            }
            return 0;
        });

    return (
        <div className={`${styles["main-container"]}`}>
            <div className={`${styles["button-container"]}`}>
                <BorderedButton
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Read all reviews
                </BorderedButton>

                <SwipeableCard
                    open={open}
                    onOpen={toggleDrawer}
                    closeDrawer={handleCloseDrawer}
                >
                    <div className={`${styles["main-swipe-container"]}`}>
                        <div className={`${styles["top-swipe-container"]}`}>
                            <div>
                                <p>Reviews</p>
                            </div>
                        </div>
                        <div className={`${styles["unit-swipe-container"]}`}>
                            <div className={`${styles["main-sort-container"]}`}>
                                <p>Sort by:</p>
                                <div className={`${styles["sort-container"]}`}>
                                    <button
                                        onClick={() => handleSortClick("all")}
                                        className={
                                            selectedSort === "all"
                                                ? `${styles.active}`
                                                : ""
                                        }
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => handleSortClick("5.0")}
                                        className={
                                            selectedSort === "5.0"
                                                ? `${styles.active}`
                                                : ""
                                        }
                                    >
                                        5.0
                                    </button>
                                    <button
                                        onClick={() => handleSortClick("4.0")}
                                        className={
                                            selectedSort === "4.0"
                                                ? `${styles.active}`
                                                : ""
                                        }
                                    >
                                        4.0
                                    </button>
                                    <button
                                        onClick={() => handleSortClick("3.0")}
                                        className={
                                            selectedSort === "3.0"
                                                ? `${styles.active}`
                                                : ""
                                        }
                                    >
                                        3.0
                                    </button>
                                    <button
                                        onClick={() => handleSortClick("2.0")}
                                        className={
                                            selectedSort === "2.0"
                                                ? `${styles.active}`
                                                : ""
                                        }
                                    >
                                        2.0
                                    </button>
                                    <button
                                        onClick={() => handleSortClick("1.0")}
                                        className={
                                            selectedSort === "1.0"
                                                ? `${styles.active}`
                                                : ""
                                        }
                                    >
                                        1.0
                                    </button>
                                </div>
                            </div>

                            <div className={styles["main-card-container"]}>
                                {filteredReviews.length === 0 ? (
                                    <p
                                        className={
                                            styles["no-units-found-message"]
                                        }
                                    >
                                        No units found.
                                    </p>
                                ) : (
                                    filteredReviews.map((review) => (
                                        <UnitReply
                                        key={review.id}
                                        review={review}
                                        showLandlordReply={showLandlordReply [review.id] ||  false}
                                        toggleShowLandlordReply={() => toggleShowLandlordReply(review.id)}
                                        handleSendClick={(reviewId, landlordReply) =>
                                            handleSendClick(reviewId, landlordReply)
                                        }
                                        loggedInUserId={loggedInUserId}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </SwipeableCard>
            </div>
        </div>
    );
};

export default UnitDetails;
