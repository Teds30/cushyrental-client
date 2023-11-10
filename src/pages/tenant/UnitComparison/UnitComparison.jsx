import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import useUnitManager from "../../../hooks/data/units-hook";

import styles from "./UnitComparison.module.css";
import { FiChevronLeft } from 'react-icons/fi'
import { useEffect } from 'react';
import UnitComparisonTable from "./UnitComparisonTable";

const UnitComparison = () => {
    const { id } = useParams();

    const {fetchUnit, isLoading} = useUnitManager();

    const [ unitData, setUnitData ] = useState({});

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnit(id)
                setUnitData(res)
            } catch (err) {}
        }
        handleFetch()
    }, [id])

    return !isLoading && Object.keys(unitData).length !== 0 && (
        <div className={`${styles["unit-comparison-container"]}`}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                        borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar className={`${styles["toolbar-container"]}`}>
                        <Link
                            to={`/favorites`}
                            // onClick={(e) => {
                            //     e.preventDefault()
                            //     navigate(-1)
                            // }}
                            className={`${styles["link-button"]}`}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: "var(--fc-strong)",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box className={`${styles["manage-unit-title"]}`}>
                            <p className="title">Unit Comparison</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <UnitComparisonTable unitData={unitData}/>                     
        </div>
    );
};

export default UnitComparison;
