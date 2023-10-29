import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Quantity from "../../../components/Quantity/Quantity";

import styles from "./SearchUnit.module.css";

const UnitQuantity = (props) => {
    const { onQuantity, quantityValue } = props;
    const [unitQuantity, setUnitQuantity] = useState(quantityValue ?? 1);

    const quantityHandler = (value) => {
        setUnitQuantity(value.value);
        onQuantity(value.value);
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
                    Quantity
                </p>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
                <div className={`${styles["filter-col"]}`}>
                    <div className={`${styles["hr"]}`}></div>
                    <Quantity
                        maxValue={10}
                        setQuantityvalue={unitQuantity}
                        onQuantity={quantityHandler}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default UnitQuantity;
