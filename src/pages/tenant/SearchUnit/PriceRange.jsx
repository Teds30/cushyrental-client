import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import RangeSlider from "../../../components/Slider/RangeSlider";

import styles from "./SearchUnit.module.css";

const PriceRange = (props) => {
    const { onPriceRange } = props
    const [priceRange, setPriceRange] = useState();

    const priceRangeHandler = (value) => {
        setPriceRange(value);
        onPriceRange(value);
    }

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
                    margin: '0',
                    "& MuiAccordionSummary-content": {
                        margin: "0",
                    },
                }}
            >
                <p className="title" style={{color: 'var(--fc-body)', fontWeight: '700'}}>Price Range</p>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
                <div className={`${styles["filter-col"]}`}>
                    <div className={`${styles["hr"]}`}></div>
                    <RangeSlider onRangeValue={priceRangeHandler}/>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default PriceRange;
