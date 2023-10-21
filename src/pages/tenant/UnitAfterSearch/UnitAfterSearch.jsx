import React, { useState, useEffect } from "react";
import { Link, navigate } from "react-router-dom";
import { StyledTabs, StyledTab, TabPanel } from "../../../components/Tabs/Tabs";
import styles from "./UnitAfterSearch.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import ListAfterSearch from "./ListAfterSearch";
import SwipeableCard from "../../../components/SwipeableCard/SwipeableCard";
import UnitOption from "./UnitOption";

import { FiChevronLeft } from "react-icons/fi";
import { CgOptions } from "react-icons/cg";


const UnitAfterSearch = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState();
    const [units, setUnits] = useState([]);

    console.log(units);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/units`
                );
                const data = await response.json();
                setUnits(data);
            } catch (error) {
                console.error("Error fetching units:", error);
                // setUnits([]);
            }
        };
        fetchUnits();
    }, []);

    return (
        <div className={`${styles["main-container"]} `}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
                        <Link
                            to=""
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
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
                        <Box sx={{ flexGrow: 1, alignItems: "center" }}>
                            <p className="title">Boarding Houses</p>
                            <p>Rizal St., Legazpi City 500m radius</p>
                        </Box>
                        <button
                            className={`${styles["option-button"]} `}
                            onClick={toggleDrawer(true)}
                        >
                            <CgOptions />
                        </button>
                    </Toolbar>

                    <Box
                        className={styles["filter"]}
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            sx={{ display: "flex", flex: 1, gap: "0" }}
                        >
                            <StyledTab
                                disableRipple
                                sx={{
                                    textTransform: "none",
                                    flex: 1,
                                    maxWidth: "100%",
                                    margin: "0",
                                }}
                                label="Lists"
                            />

                            <StyledTab
                                disableRipple
                                sx={{
                                    textTransform: "none",
                                    flex: 1,
                                    maxWidth: "100%",
                                    margin: "0",
                                }}
                                label="Map"
                            />
                        </StyledTabs>
                    </Box>
                </AppBar>
            </Box>

            <TabPanel value={value} index={0}>
                <ListAfterSearch units={units} />
                {/* {!tenantsData ? (
                    <p>No Tenants available</p>
                ) : (
                    <ManageTenants
                        tenants={tenantsData}
                        setTenants={setTenantsData}
                        onRefresh={fetchTenantsData}
                    />
                )} */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* {!inquiriesData ? (
                    <p>No Pending Inquiries available</p>
                ) : (
                    <ManagePendingInquiries pendingInquiries={inquiriesData} />
                )} */}
            </TabPanel>
            <SwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
            >
                {" "}
                <div style={{ padding: "0 20px" }}>
                    <div className={`${styles["main-swipe-container"]}`}>
                        <div className={`${styles["top-swipe-container"]}`}>
                            <div>
                                <p className="title">Sort</p>
                            </div>
                        </div>
                        <div className={`${styles["swipe-content-container"]}`}>
                            <UnitOption />
                        </div>
                    </div>
                </div>
            </SwipeableCard>
        </div>
    );
};

export default UnitAfterSearch;
