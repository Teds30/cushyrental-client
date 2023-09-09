import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import styles from "./ManageRenters.module.css";
import SearchField from "../../../components/Search/SearchField";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../components/Button/BorderlessButton";
import { FiChevronLeft } from "react-icons/fi";
import CheckBox from "../../../components/CheckBox/CheckBox";

const ManageRenters = () => {
    const [activeFilter, setActiveFilter] = useState("tenants");
    const [rentalData, setRentalData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/landlord_tenants/1"
                );
                const data = await response.json();
                setRentalData(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
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

    const handleUserClick = (user) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(user)) {
                return prevSelectedUsers.filter(
                    (selectedUser) => selectedUser !== user
                );
            } else {
                return [...prevSelectedUsers, user];
            }
        });
        setShowCheckboxes(true);
    };

    const handleToggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes); // Toggle checkbox visibility
    };

    const handleCancelSelection = () => {
        setSelectedUsers([]);
        setShowCheckboxes(false);
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
                    className={`${styles["filter-1"]} ${
                        activeFilter === "tenants"
                            ? styles["active-filter"]
                            : ""
                    }`}
                    onClick={() => handleFilterClick("tenants")}
                >
                    <Link>
                        <p className={styles["title-1"]}>Tenants</p>
                    </Link>
                </div>

                <div className={`${styles["filter-2"]}`}>
                    <Link to="/myunit-landlord/managependinginquiries">
                        <p className={styles["title-2"]}>Pending Inquiries</p>
                    </Link>
                </div>
            </div>

            <div className={`${styles["search-box"]} `}>
                <SearchField placeholder="Search">
                    <input type="text" className="search-input" />
                </SearchField>
            </div>

            {rentalData.map((user) => (
                <div
                    key={user.id}
                    className={`${styles["tenants-main-box_container"]} `}
                    id={`user-${user.id}`}
                    onClick={() => handleUserClick(user)}
                >
                    <div className={`${styles["box-container"]} `}>
                        <div className={`${styles["box-image"]} `}>
                            <img src={user.profile_picture_img} alt="Renter" />
                        </div>
                        <div className={`${styles["box-details"]} `}>
                            <p className={`${styles["box-details-name"]} `}>
                                {user.first_name} {user.middle_name}{" "}
                                {user.last_name}
                            </p>
                            <p className={`${styles["box-details-gender"]} `}>
                                {GenderToText(user.gender)}
                            </p>
                            <p className={`${styles["box-details-time"]} `}>
                                {user.created_at}
                            </p>
                        </div>
                        {showCheckboxes && ( // Conditionally render checkboxes based on the state
                            <div className={`${styles["box-selected"]} `}>
                                <CheckBox
                                    items={[user]}
                                    onCheckBox={(checkedItems) => {
                                        console.log(checkedItems);
                                    }}
                                    checked={selectedUsers.includes(user)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {selectedUsers.length > 0 && (
                <div className={`${styles["terminate-container"]} `}>
                    <div className={`${styles["terminate-container-top"]} `}>
                        <div>
                            <p>Selected ({selectedUsers.length})</p>
                        </div>
                        <div>
                            <BorderlessButton
                                width="100%"
                                onClick={handleCancelSelection}
                            >
                                Cancel
                            </BorderlessButton>
                        </div>
                    </div>
                    <div className={`${styles["terminate-container-bottom"]} `}>
                        <PrimaryButton width="100%" btnType="danger">
                            Terminate
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRenters;
