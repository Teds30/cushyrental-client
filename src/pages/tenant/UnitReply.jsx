import React from "react";
import styles from "./UnitDetails.module.css";
import moment from "moment";
import { IoSend } from "react-icons/io5";
import { TbFlag } from "react-icons/tb";
import UnitDetailsRating from "./UnitDetailsRating";
import TextField from "../../components/TextField/TextField";

const UnitDetails = ({
    review,
    showLandlordReply,
    toggleShowLandlordReply,
    handleSendClick,
    loggedInUserId,
}) => {
    const formatDate = (dateString) => {
        const date = moment(dateString);
        return date.format("DD/MM/YYYY | hh:mm A");
    };

    return (
        <div className={styles["card-container"]} key={review.id}>
            <div className={`${styles["top-card-container"]}`}>
                <div className={`${styles["inside-card-container"]}`}>
                    <div className={`${styles["image-card-container"]}`}>
                        <img src="" alt="" />
                    </div>
                    <div className={`${styles["text-card-container"]}`}>
                        <p>
                            {`${review.user.first_name} ${review.user.middle_name} ${review.user.last_name}`}
                        </p>
                        <div className={`${styles["profile-star-container"]}`}>
                            <div className={`${styles["prof-star-container"]}`}>
                                {
                                    <UnitDetailsRating
                                        average_ratings={review.star}
                                    />
                                }
                            </div>
                            <div>
                                <p className="caption">
                                    {review.star}
                                    .0/5
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className={`${styles["button-flag-container"]}`}>
                        <TbFlag />
                    </button>
                </div>
            </div>

            <div className={`${styles["details-container"]}`}>
                <p>{review.message}</p>
            </div>

            <div className={styles["hr"]}></div>

            <div className={`${styles["ratings-container"]}`}>
                <div className={`${styles["ratings-left-container"]}`}>
                    <p>Environment</p>
                    <p>Boarding House</p>
                    <p>Landlord</p>
                </div>
                <div className={`${styles["ratings-right-container"]}`}>
                    <UnitDetailsRating
                        average_ratings={review.environment_star}
                    />
                    <UnitDetailsRating average_ratings={review.unit_star} />
                    <UnitDetailsRating average_ratings={review.landlord_star} />
                </div>
            </div>

            <div className={`${styles["date-container"]}`}>
                <p>{formatDate(review.created_at)}</p>
                <button
                    onClick={toggleShowLandlordReply}
                    className={`${styles["button-show-container"]}`}
                >
                    {showLandlordReply ? "Hide Replies" : "Show Replies"}
                </button>
            </div>

            {showLandlordReply && (
                <div className={styles["landlord-reply-container"]}>
                    <div className={`${styles["landlord-top-container"]}`}>
                        <p>Landlord's Reply</p>
                    </div>
                    <div className={`${styles["landlord-bottom-container"]}`}>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div>
                            <p className="strong">
                                Teddy Marc Enaje •
                                <span className="smaller-text">1 day ago</span>
                            </p>
                            <p className="smaller-text">
                                Thank you for choosing my unit!
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {loggedInUserId === review.rental.unit.landlord_id && (
                <div className={styles["reply-container"]}>
                    <TextField
                        multiline
                        fullWidth
                        variant="outlined"
                        label="Write a reply"
                    />
                    <button
                        onClick={handleSendClick}
                        className={styles["button-send-container"]}
                        style={{ fontSize: "25px" }}
                    >
                        <IoSend />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UnitDetails;
