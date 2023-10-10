import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import useUnitManager from "../../../hooks/data/units-hook";

import styles from "./ViewUnitDetails.module.css";
import { FiChevronLeft } from "react-icons/fi";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import UnitDetails from "./UnitDetails";
import Bookmark from "./Bookmark";

const ViewUnitDetails = () => {
    const { id } = useParams();
    const { fetchUnit, isLoading } = useUnitManager();

    const [unitData, setUnitData] = useState({});

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnit(id);
                setUnitData(res);
            } catch (err) {}
        };
        handleFetch();
    }, [id]);

    return (
        Object.keys(unitData).length !== 0 &&
        !isLoading && (
            <div className={`${styles["unit-details-container"]}`}>
                <Box className={`${styles["top-back-container"]} `}>
                    <AppBar
                        position="absolute"
                        sx={{
                            margin: 0,
                            background: "transparent",
                            fontFamily: "Inter",
                            boxShadow: "none",
                            display: "flex",
                        }}
                    >
                        <Toolbar className={`${styles["toolbar-container"]}`}>
                            <div className={`${styles["back-button"]}`}>
                                <Link
                                    // to={`/manage_unit/edit/`}
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
                                                color: "var(--bg-layer1)",
                                                fill: "transparent",
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                                <Box className={`${styles["app-bar-title"]}`}>
                                    <p className="title">{unitData.name}</p>
                                </Box>
                            </div>
                            <button className={`${styles["bookmark"]}`}>
                                <Bookmark adjustSize="true"/>
                            </button>
                        </Toolbar>
                    </AppBar>
                </Box>

                <UnitDetails unit={unitData} />
            </div>
        )
    );
};

export default ViewUnitDetails;
