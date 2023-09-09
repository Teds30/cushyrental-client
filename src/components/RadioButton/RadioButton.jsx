import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import styles from "./RadioButton.module.css";

const RadioButton = (props) => {
    const {
        items = [],
        onSelectedValue,
        selectedValue = 0,
        button = false,
    } = props;

    const handleChange = (event) => {
        const newValue = event.target.value.toString();
        onSelectedValue(newValue);
    };

    const content = items.map((item) => (
        <RadioGroup
                value={selectedValue.toString()} // Ensure the value is a string
                name="radio-buttons-group"
                onChange={handleChange}
                className={`${button ? styles["radio-button"] : ""} ${
                    selectedValue === item.id && styles["radio-style"]
                }`}
                key={item.id}
                defaultValue={selectedValue}
            >
                <FormControlLabel
                value={item.id.toString()} // Ensure the value is a string
                control={<Radio sx={{ color: "var(--accent)" }} />}
                label={item.name}
                sx={{
                    "& .MuiSvgIcon-root": {
                        color: "var(--accent)",
                    },
                }}
                className={`${styles['radio-button-style']}`}
            />
                
            </RadioGroup>
    ));

    return (
        <FormControl sx={{
            display: button ? "flex" : "",
            flexDirection: button ? "column" : "",
            gap: button ? "12px" : "",
        }}>
            {content}
        </FormControl>
    );
};

export default RadioButton;
