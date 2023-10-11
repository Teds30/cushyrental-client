import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import useUnitManager from "../../../hooks/data/units-hook";
import UnitDetails from "./UnitDetails";
import Bookmark from "./Bookmark";
import BorderedButton from "../../../components/Button/BorderedButton";
import CardBlur from "../../../components/Card/CardBlur";
import PrimaryButton from "../../../components/Button/PrimaryButton";

import styles from "./ViewUnitDetails.module.css";
import CallIcon from "@mui/icons-material/Call";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ViewUnitDetails = () => {
    const { id } = useParams();
    const { fetchUnit, isLoading } = useUnitManager();

    const [unitData, setUnitData] = useState({});
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnit(id);
                console.log(res);
                setUnitData(res);
            } catch (err) {}
        };
        handleFetch();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolling]);

    return (
        Object.keys(unitData).length !== 0 &&
        !isLoading && (
            <div className={`${styles["unit-details-container"]}`}>
                <Box
                    className={`${styles["top-back-container"]} ${
                        scrolling ? styles["scrolling"] : ""
                    }`}
                >
                    <AppBar
                        position="static"
                        className={`${styles["app-bar-container"]}`}
                        sx={{
                            margin: 0,
                            fontFamily: "Inter",
                            boxShadow: "none",
                            display: "flex",
                            background: "transparent",
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
                                        <ArrowBackIosIcon
                                            style={{
                                                color: scrolling
                                                    ? "black"
                                                    : "white",
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                                <Box className={`${styles["app-bar-title"]}`}>
                                    <p className="title">{unitData.name}</p>
                                </Box>
                            </div>
                            <button className={`${styles["bookmark"]}`}>
                                <Bookmark adjustSize="true" />
                            </button>
                        </Toolbar>
                    </AppBar>
                </Box>

                <UnitDetails unit={unitData} />

                <div className={`${styles["view-details-botton-section"]}`}>
                    <CardBlur style={{ display: "flex" }}>
                        <div className={`${styles["view-details-botton"]}`}>
                            <BorderedButton
                                width="100%"
                                leftIcon={<CallIcon />}
                            >
                                <a href={`tel:${unitData.landlord.phone_number}`}>Call</a>
                            </BorderedButton>
                            <PrimaryButton width="100%">
                                <Link style={{ color: "white" }}>
                                    Inquire Now
                                </Link>
                            </PrimaryButton>
                        </div>
                    </CardBlur>
                </div>
            </div>
        )
    );
};

export default ViewUnitDetails;
