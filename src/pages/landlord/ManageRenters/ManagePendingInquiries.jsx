import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import styles from "./ManageRenters.module.css";

import SearchField from "../../../components/Search/SearchField";
import { FiChevronLeft } from "react-icons/fi";

const ManagePendingInquiries = () => {
    const [activeFilter, setActiveFilter] = useState("inquiries");
    const [rentalData, setRentalData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/users/2")
            .then((response) => response.json())
            .then((data) => setRentalData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const GenderToText = (gender) => {
        if (gender === 1) {
            return "Male";
        } else if (gender === 2) {
            return "Female";
        } else if (gender === 3) {
            return "Not to specify";
        } else {
            return "Unknown";
        }
    };
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

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

            <div className={styles["filter"]}>
                <div
                    className={`${styles["filter-1"] }`}
                >
                    <Link to="/myunit-landlord/managerenters">
                        <p className={styles["title-2"]}>Tenants</p>
                    </Link>
                </div>

                <div
                    className={`${styles["filter-2"]} ${
                        activeFilter === "inquiries" ? styles["active-filter"] : ""
                    }`}
                    onClick={() => handleFilterClick("inquiries")}
                >
                    <Link>
                        <p className={styles["title-1"]}>Pending Inquiries</p>
                    </Link>
                </div>
            </div>

            <div className={`${styles["search-box"]} `}>
                <SearchField placeholder="Search">
                    <input type="text" className="search-input" />
                </SearchField>
            </div>

            {rentalData && (
                <div
                    className={`${styles["tenants-main-box_container"]} `}
                    id="tenants"
                >
                    <div className={`${styles["box-container"]} `}>
                        <div className={`${styles["box-image"]} `}>
                            <img
                                src={rentalData.profile_picture_img}
                                alt="Renter"
                            />
                        </div>
                        <div className={`${styles["box-details"]} `}>
                            <p className={`${styles["box-details-name"]} `}>
                                {rentalData.first_name} {rentalData.middle_name}{" "}
                                {rentalData.last_name}
                            </p>
                            <p className={`${styles["box-details-gender"]} `}>
                                {GenderToText(rentalData.gender)}
                            </p>
                            <p className={`${styles["box-details-time"]} `}>
                                {rentalData.created_at}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePendingInquiries;
