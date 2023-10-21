import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ChipOutlined from "../../../components/Chips/ChipOutlined";

import styles from "./SearchUnit.module.css";

const Inclusions = (props) => {
    const { onInclusion, inclusions } = props;

    const inclusionHandler = (value) => {
        onInclusion(value);
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
                    Inclusions
                </p>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
                <div className={`${styles["filter-col"]}`}>
                    <div className={`${styles["hr"]}`}></div>
                    <ChipOutlined
                        items={inclusions}
                        onChipValue={inclusionHandler}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default Inclusions;
