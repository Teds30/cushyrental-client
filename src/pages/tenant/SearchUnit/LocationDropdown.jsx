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
                <IoLocationOutline
                    size={25}
                    style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '10px',
                        fill: '#5C6173',
                    }}
                />
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
