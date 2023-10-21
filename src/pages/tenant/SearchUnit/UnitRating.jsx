import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ChipOutlined from "../../../components/Chips/ChipOutlined";

import styles from "./SearchUnit.module.css";

const UnitRating = (props) => {
    const { onRating } = props;
    const [rating, setRating] = useState(1);

    const ratingChangeHandler = (event) => {
        setRating(event.target.value);
        onRating(Number(event.target.value));
    };

    return (
        <Accordion
            sx={{
                border: "none",
                outline: "none",
                background: "rgba(255, 255, 255, 0.80)",
                boxShadow: "none",
                padding: "0",
            }}
        >
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    padding: "0",
                    margin: "0",
                    "& MuiAccordionSummary-content": {
                        margin: "0",
                    },
                }}
            >
                <p
                    className="title"
                    style={{ color: "var(--fc-body)", fontWeight: "700" }}
                >
                    Rating
                </p>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
                <div className={`${styles["filter-col"]}`}>
                    <div className={`${styles["hr"]}`}></div>
                    <Rating
                        name="simple-controlled"
                        value={Number(rating)}
                        onChange={ratingChangeHandler}
                        sx={{
                            fontSize: "32px",
                            color: "var(--accent)",
                            "& svg": {
                                fill: "var(--accent)",
                            },
                        }}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default UnitRating;
