import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const UnitOption = ({ onSortChange, sortOption  }) => {
    const [value, setValue] = useState(sortOption);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        onSortChange(selectedValue);
    };


    
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="nearest"
                    control={<Radio size="small" />}
                    label="Nearest"
                />
                <FormControlLabel
                    value="priceHighLow"
                    control={<Radio size="small" />}
                    label="Price High to Low"
                />
                <FormControlLabel
                    value="priceLowHigh"
                    control={<Radio size="small" />}
                    label="Price Low to High"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default UnitOption;
