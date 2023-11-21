import React, { useState, useEffect, useContext } from "react";
import { Link, navigate } from "react-router-dom";
import styles from "./RentedUnit.module.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { FiChevronLeft } from "react-icons/fi";
import moment from "moment";
import RentedUnitTabs from "./RentedUnitTabs";
import AuthContext from "../../../context/auth-context";

const RentedUnitMain = () => {
    const [rentedUnit, setRentedUnit] = useState([]);
    const authCtx = useContext(AuthContext);

    const formatDate = (dateString) => {
        const date = moment(dateString);
        return date.format("MMMM DD, YYYY");
    };

    const fetchRentals = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/tenant-rentals/${
                    authCtx.user.id
                }`
            );
            const data = await response.json();
            setRentedUnit(data);
            // console.log("fetched");
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // console.log(rentedUnit);
    // console.log(authCtx.user.id);
    useEffect(() => {
        if (authCtx.user) fetchRentals();
    }, [authCtx.user]);

    return (
        <div className={`${styles["main-container"]} `}>
            <div className={`${styles["app-bar"]}`}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "var(--bg-layer1)",
                        // backgroundColor: "red",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                        // width: "768px",
                        // border: "2px solid red",
                    }}
                    
                >
                    <Toolbar className={`${styles["toolbar-container"]}`}>
                        <Link to={`/profile`}>
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
                        <Box
                            sx={{ marginLeft: "-30px" }}
                            className={`${styles["manage-unit-title"]}`}
                        >
                            <p className="title">Rented Unit</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>
            {/* {rentedUnit.length !== 0 && ( */}
            <div className={`${styles["top-back-container"]} `}>
                <RentedUnitTabs
                    rentedUnit={rentedUnit}
                    onRefresh={fetchRentals}
                />
            </div>
            {/* )} */}
        </div>
    );
};

export default RentedUnitMain;
