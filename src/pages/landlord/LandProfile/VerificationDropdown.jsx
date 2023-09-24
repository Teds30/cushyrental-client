import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsPersonVcard } from "react-icons/bs"; // Import the BsPersonVcard icon

const cardIdentification = [
    {
        id: 0,
        name: "Select Indentification Card",
    },
    {
        id: 1,
        name: "Postal ID",
    },
    {
        id: 2,
        name: "National ID",
    },
    {
        id: 3,
        name: "Driver's License",
    },
    {
        id: 4,
        name: "Business Permit",
    }
]

export default function VerificationDropdown() {
    const [age, setAge] = React.useState(0);

    const handleChange = (event) => {
        console.log(event.target.value)
        // setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, position: 'relative' }}>
            <FormControl fullWidth>
                <BsPersonVcard size={25} style={{position: 'absolute', bottom: '16px', left: '10px', fill: '#5C6173'}}/>
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={age}
                    // label="Age"
                    onChange={handleChange}
                    sx={{paddingLeft: '30px', border: 'none', outline: 'none'}}
                    // Use InputProps to add the icon
                >
                    {cardIdentification.map((card) => {
                        return (
                            <MenuItem key={card.id} value={card.id}>{card.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
