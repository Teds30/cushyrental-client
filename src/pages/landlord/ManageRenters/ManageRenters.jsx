import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ManageTenants from "./ManageTenants";
import ManagePendingInquiries from "./ManagePendingInquiries";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { StyledTabs, StyledTab, TabPanel } from "../../../components/Tabs/Tabs";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import styles from "./ManageRenters.module.css";
import { FiChevronLeft } from "react-icons/fi";

const ManageRenters = () => {
    const [tenantsData, setTenantsData] = useState([]);
    const [inquiriesData, setInquiriesData] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchTenantsData = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/landlord_tenants/1"
                );
                const data = await response.json();
                setTenantsData(data);
            } catch (error) {
                console.error("Error fetching tenants data:", error);
            }
        };

        const fetchInquiriesData = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:4000/inquiries/1"
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
                        <Link to="/myunit-landlord">
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
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label="Tenants"
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
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
                {!tenantsData ? (
                    <p>No Renters available</p>
                ) : (
                    <ManageTenants tenants={tenantsData} />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {!inquiriesData ? (
                    <p>No Pending Inquiries available</p>
                ) : (
                    <ManagePendingInquiries pendingInquiries={inquiriesData} />
                )}
            </TabPanel>
        </div>
    );
};

export default ManageRenters;
