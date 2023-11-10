import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from '@mui/icons-material/Star';

const RentedUnitRatingStar = (props) => {
    const { average_ratings } = props;
    const [starsToShow, setStarsToShow] = useState(5);

    useEffect(() => {
        if (Number.isInteger(average_ratings)) {
            setStarsToShow(average_ratings);
        } else if ([1.5, 2.5, 3.5, 4.5].includes(average_ratings)) {
            setStarsToShow(average_ratings);
        } else {
            setStarsToShow(Math.round(average_ratings * 2) / 2);
        }
    }, [average_ratings]);

    return (
        <Stack spacing={1}>
            <Rating
                name="custom-rating-read"
                readOnly
                size="small"
                max={5}
                value={starsToShow}
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55, color: "#8A93A6"}} fontSize="inherit" />}
                sx={{
                    color: "var(--accent)",
                    fontSize: "22px",
                    "& .MuiRating-icon": {
                        marginRight: "2px",
                        marginLeft: "15px", 
                    },

                    '@media (max-width: 768px)': {
                        "& .MuiRating-icon": {
                            marginRight: "5px",
                            marginLeft: "8px",
                            transition: "all 0.15s ease-in-out",
                        },
                    },

                    '@media (min-width: 375px)': {
                        "& .MuiRating-icon": {
                            marginRight: "6px",
                            marginLeft: "6px",
                        },
                    },
                    
                    '@media (min-width: 475px)': {
                        "& .MuiRating-icon": {
                            marginRight: "15px",
                            marginLeft: "23px", 
                        },
                    },

                    '@media (min-width: 550px)': {
                        "& .MuiRating-icon": {
                            marginRight: "20px",
                            marginLeft: "30px",
                        },
                    },
                    
                    '@media (min-width: 640px)': {
                        "& .MuiRating-icon": {
                            marginRight: "25px",
                            marginLeft: "40px"
                        },
                    },
                    
                    '@media (min-width: 768px)': {
                        "& .MuiRating-icon": {
                            marginRight: "30px",
                            marginLeft: "45px",
                        },
                    
                    }
                }}
            />
        </Stack>
    );
};

export default RentedUnitRatingStar