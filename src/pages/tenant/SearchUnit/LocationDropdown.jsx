import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoLocationOutline } from "react-icons/io5"; // Import the BsPersonVcard icon
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import useVerificationManager from "../../../hooks/data/verifications-hook";

export default function LocationDropdown(props) {
    const { universities, location, onChangeLocation, searchType } = props;

    // const { fetchIdentificationCards, isLoading } = useVerificationManager();

    // useEffect(() => {
    //     const handleFetch = async () => {
    //         try {
    //             const res = await fetchIdentificationCards();
    //             setCardIdentification([...cardIdentification, ...res]);
    //         } catch (err) {}
    //     };
    //     handleFetch();
    // }, []);

    return (
        <Box sx={{ minWidth: 120, position: "relative" }}>
            <FormControl fullWidth>
                <span
                    style={{
                        position: "absolute",
                        bottom: "5px",
                        left: "20px",
                        fill: "none",
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-school"
                        strokeWidth=".1"
                        stroke="currentColor"
                        color="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            d="M14 3.50001V4.00001C14 4.06631 13.9754 4.1299 13.9317 4.17678C13.8879 4.22367 13.8286 4.25001 13.7667 4.25001H13.0667V4.62501C13.0667 4.8321 12.91 5.00001 12.7167 5.00001H1.28333C1.09005 5.00001 0.933333 4.8321 0.933333 4.62501V4.25001H0.233333C0.171449 4.25001 0.1121 4.22367 0.0683417 4.17678C0.0245833 4.1299 0 4.06631 0 4.00001V3.50001C3.33709e-07 3.45055 0.0136931 3.4022 0.0393459 3.36108C0.0649986 3.31996 0.101459 3.28792 0.144112 3.26901L6.91078 0.519008C6.96791 0.493664 7.03209 0.493664 7.08922 0.519008L13.8559 3.26901C13.8985 3.28792 13.935 3.31996 13.9607 3.36108C13.9863 3.4022 14 3.45055 14 3.50001ZM13.3 13H0.7C0.313396 13 0 13.3358 0 13.75V14.25C0 14.3163 0.0245833 14.3799 0.0683417 14.4268C0.1121 14.4737 0.171449 14.5 0.233333 14.5H13.7667C13.8286 14.5 13.8879 14.4737 13.9317 14.4268C13.9754 14.3799 14 14.3163 14 14.25V13.75C14 13.3358 13.6866 13 13.3 13ZM2.33333 5.50001V11.5H1.28333C1.09005 11.5 0.933333 11.6679 0.933333 11.875V12.5H13.0667V11.875C13.0667 11.6679 12.91 11.5 12.7167 11.5H11.6667V5.50001H9.8V11.5H7.93333V5.50001H6.06667V11.5H4.2V5.50001H2.33333Z"
                            fill="#5c6173"
                        />
                    </svg>
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-school"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        color="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg> */}
                </span>
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={location}
                    // label="Age"
                    onChange={onChangeLocation}
                    sx={{
                        paddingLeft: "30px",
                        border: "none",
                        outline: "none",
                    }}
                    // Use InputProps to add the icon
                >
                    {universities.map((card) => {
                        return (
                            <MenuItem key={card.id} value={card}>
                                {card.name}{" "}
                                {/* {searchType === 1 ? 'Location' : 'Institution'} */}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
