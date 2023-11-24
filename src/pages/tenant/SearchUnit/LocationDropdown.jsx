import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { IoLocationOutline } from 'react-icons/io5' // Import the BsPersonVcard icon
import LocationOnIcon from '@mui/icons-material/LocationOn'
// import useVerificationManager from "../../../hooks/data/verifications-hook";

export default function LocationDropdown(props) {
    const { universities, location, onChangeLocation, searchType } = props

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
        <Box sx={{ minWidth: 120, position: 'relative' }}>
            <FormControl fullWidth>
                <span
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        fill: 'none',
                    }}
                >
                    <svg
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
                    </svg>
                </span>
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={location}
                    // label="Age"
                    onChange={onChangeLocation}
                    sx={{
                        paddingLeft: '30px',
                        border: 'none',
                        outline: 'none',
                    }}
                    // Use InputProps to add the icon
                >
                    {universities.map((card) => {
                        return (
                            <MenuItem key={card.id} value={card}>
                                {card.name}{' '}
                                {/* {searchType === 1 ? 'Location' : 'Institution'} */}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}
