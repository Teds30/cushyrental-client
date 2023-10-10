import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const UnitDetailsRating = (props) => {
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
                sx={{ color: "var(--accent)" }}
            />
        </Stack>
    );
};

export default UnitDetailsRating