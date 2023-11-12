import React from "react";
import Rating from "@mui/material/Rating";
import styles from "./RentedUnit.module.css";

const RentedUnitRating = (props) => {
    const { value, onRatingChange } = props;

    // console.log(value);
    return (
        <div className={`${styles["star-container"]}`}>
            <Rating
                name="custom-rating-read"
                // defaultValue={5}
                value={value}
                onChange={(event, newValue) => onRatingChange(newValue)}
                sx={{
                    color: "var(--accent)",
                    fontSize: "22px",
                    "& .MuiRating-icon": {
                        gap: "0px",
                        // marginRight: "2px",
                        // marginLeft: "15px", 
                    },

                    '@media (max-width: 768px)': {
                        "& .MuiRating-icon": {
                            // marginRight: "5px",
                            // marginLeft: "8px",
                            transition: "all 0.15s ease-in-out",
                            gap: "0px",
                        },
                    },

                    '@media (min-width: 375px)': {
                        "& .MuiRating-icon": {
                            // marginRight: "10px",
                            // marginLeft: "12px",
                            gap: "0px",
                        },
                    },
                    
                    '@media (min-width: 475px)': {
                        "& .MuiRating-icon": {
                            // marginRight: "15px",
                            // marginLeft: "23px", 
                            gap: "0px",
                        },
                    },

                    '@media (min-width: 550px)': {
                        "& .MuiRating-icon": {
                            // marginRight: "20px",
                            // marginLeft: "30px",
                            gap: "0px",
                        },
                    },
                    
                    '@media (min-width: 640px)': {
                        "& .MuiRating-icon": {
                            // marginRight: "25px",
                            // marginLeft: "40px"
                            gap: "0px",
                        },
                    },
                    
                    '@media (min-width: 768px)': {
                        "& .MuiRating-icon": {
                            // marginRight: "30px",
                            // marginLeft: "45px",
                            gap: "0px",
                        },
                    
                    }
                }}
            />
        </div>
    );
};

export default RentedUnitRating;
