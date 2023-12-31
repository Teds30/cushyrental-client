import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsPersonVcard } from "react-icons/bs"; // Import the BsPersonVcard icon
import useVerificationManager from "../../../hooks/data/verifications-hook";

export default function VerificationDropdown(props) {
    const { onIdentificationCard } = props;
    const { fetchIdentificationCards, isLoading } = useVerificationManager();

    const [age, setAge] = React.useState(0);
    const [cardIdentification, setCardIdentification] = useState([
        {
            id: 0,
            name: "Select Indentification Card",
        },
    ]);

    const handleChange = (event) => {
        setAge(event.target.value);
        onIdentificationCard(event.target.value);
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchIdentificationCards();
                setCardIdentification([...cardIdentification, ...res]);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <Box sx={{ minWidth: 120, position: "relative" }}>
            <FormControl fullWidth>
                <BsPersonVcard
                    size={25}
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "10px",
                        fill: "#5C6173",
                    }}
                />
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={age}
                    // label="Age"
                    onChange={handleChange}
                    sx={{
                        paddingLeft: "30px",
                        border: "none",
                        outline: "none",
                    }}
                    required
                    // Use InputProps to add the icon
                >
                    {cardIdentification.map((card) => {
                        return (
                            <MenuItem key={card.id} value={card.id}>
                                {card.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
