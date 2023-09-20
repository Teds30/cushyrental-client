import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { FiChevronLeft } from "react-icons/fi";
import LandlordUnit from "./LandlordUnit";

import SecondaryButton from "../../components/Button/SecondaryButton";
import styles from "./ViewProfile.module.css";
import { FaStar } from "react-icons/fa6";
import { TbSortDescending } from "react-icons/tb";

const ViewProfile = () => {
    const [user, setUser] = useState(null);
    const [units, setUnits] = useState([]);
    const [isPriceAscending, setIsPriceAscending] = useState(true);

    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/users/2`
                );
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchUnits = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/user_units/1`
                );
                const data = await response.json();
                setUnits(data);
            } catch (error) {
                console.error("Error fetching units:", error);
            }
        };

        fetchUsers();
        fetchUnits();
    }, []);

    const handlePriceSort = () => {
        setUnits((prevUnits) => {
            const sortedUnits = [...prevUnits].sort((unit1, unit2) => {
                if (isPriceAscending) {
                    return unit1.price - unit2.price;
                } else {
                    return unit2.price - unit1.price;
                }
            });
            setIsPriceAscending(!isPriceAscending);
            return sortedUnits;
        });
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
                        <Link>
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
                        <Box sx={{ flexGrow: 1 }}>
                            <p className="title">Back</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["profile-container"]} `}>
                <div className={`${styles["image-container"]} `}>
                    <img src={user?.profile_picture_img} alt="" />
                </div>
                <div className={`${styles["profile-details-container"]} `}>
                    <div className={`${styles["profile-details-name"]} `}>
                        <p>
                            {user?.first_name} {user?.middle_name}{" "}
                            {user?.last_name}
                        </p>
                    </div>
                    <div className={`${styles["profile-details-type"]} `}>
                        <p>{user?.user_type_id  }</p>
                    </div>
                    <div className={`${styles["profile-details-rating"]} `}>
                        <FaStar
                            style={{
                                fill: "#03b077",
                                marginTop: "-2px",
                            }}
                        />
                        <p className="caption">4.5/5.0</p>
                    </div>
                </div>
            </div>

            <div className={styles["hr"]}></div>

            <div className={`${styles["filter-container"]}`}>
                <div>
                    <SecondaryButton
                        leftIcon={
                            <TbSortDescending
                                style={{
                                    fill: "transparent",
                                    color: "#959CB0",
                                }}
                            />
                        }
                        onClick={handlePriceSort}
                    >
                        <p className="caption">Price</p>
                    </SecondaryButton>
                </div>
                <div>
                    <SecondaryButton
                        leftIcon={
                            <TbSortDescending
                                style={{
                                    fill: "transparent",
                                    color: "#959CB0",
                                }}
                            />
                        }
                    >
                        <p className="caption"> Reviews</p>
                    </SecondaryButton>
                </div>
            </div>
            <div className={`${styles["main-unit-container"]} `}>
                {units.map((unit) => (
                     <LandlordUnit key={unit.id} unit={unit} />
                ))}
            </div>
            <div className={`${styles["bottom-text-container"]}`}>
                <p>No more units found.</p>
            </div>


        </div>
    );
};

export default ViewProfile;
