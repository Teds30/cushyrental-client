import React, { useState, useEffect, useContext } from "react";
import { Link, Route, Switch, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import ManageTenants from "./ManageTenants";
import ManagePendingInquiries from "./ManagePendingInquiries";
import useRental from "../../../hooks/data/rental-hook";
import { StyledTabs, StyledTab, TabPanel } from "../../../components/Tabs/Tabs";
import AuthContext from "../../../context/auth-context";

import styles from "./ManageRenters.module.css";
import { FiChevronLeft } from "react-icons/fi";

const ManageRenters = () => {
    const [tenantsData, setTenantsData] = useState([]);
    const [inquiriesData, setInquiriesData] = useState([]);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const { fetchRentals } = useRental();
    const userCtx = useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchTenantsData = async () => {
        try {
            const res = await fetchRentals(userCtx.user.id);
            const availableRentals = res.filter(
                (rental) => rental.rental_status === 0
            );
            setTenantsData(availableRentals);
        } catch (error) {}
    };

    useEffect(() => {
        const fetchInquiriesData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_CHAT_LOCALHOST}/inquiries/${
                        userCtx.user.id
                    }`
                );
                const data = await response.json();
                setInquiriesData(data);
            } catch (error) {
                console.error("Error fetching inquiries data:", error);
            }
        };

        fetchTenantsData();
        fetchInquiriesData();
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
                        borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar>
                        <Link
                            to="/myunit-landlord"
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
                            <p className="title">Manage Renters</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

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
                        label="Tenants"
                    />

                    <StyledTab
                        disableRipple
                        sx={{
                            textTransform: "none",
                            flex: 1,
                            maxWidth: "100%",
                            margin: "0",
                        }}
                        label={
                            "Pending Inquiries" +
                            " " +
                            "(" +
                            inquiriesData.length +
                            ")"
                        }
                    />
                </StyledTabs>
            </Box>

            <TabPanel value={value} index={0}>
                {tenantsData.length === 0 ? (
                    <p className={`${styles["no-data"]}`}>
                        No Tenants available
                    </p>
                ) : (
                    <ManageTenants
                        tenants={tenantsData}
                        setTenants={setTenantsData}
                        onRefresh={fetchTenantsData}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {inquiriesData.length === 0 ? (
                    <p className={`${styles["no-data"]}`}>
                        No Pending Inquiries available
                    </p>
                ) : (
                    <ManagePendingInquiries pendingInquiries={inquiriesData} />
                )}
            </TabPanel>
        </div>
    );
};

export default ManageRenters;
