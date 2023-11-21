import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import styles from "../../landlord/MyUnit/MyUnit.module.css";

import { FiChevronLeft } from "react-icons/fi";
import { IoPeopleSharp } from "react-icons/io5";
import { TbBuildingCommunity } from "react-icons/tb";

const MyUnit = () => {
    return (
        <div className={`${styles["main-container"]} `}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "transparent",
                        color: "#fff",
                        fontFamily: "Inter",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
                        <Link to={"/profile"}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: "#fff",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box sx={{ flexGrow: 1, alignItems: "center" }}>
                            <p className={`${styles["page-title"]} `}>
                                MY UNIT
                            </p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["background-img_container"]} `}>
                <div className={`${styles["background-img-top"]} `}></div>
                <div className={`${styles["background-img-1"]} `}>
                    <svg
                        viewBox="0 0 360 190"
                        fill="none"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 0H360.327C360.327 0 406.841 110.249 360.327 164.865C285.814 252.359 0 76.2097 0 164.865C0 253.52 0 0 0 0Z"
                            fill="#1D6156"
                        />
                    </svg>
                </div>
            </div>

            <div className={`${styles["main-box_container"]} `}>
                <Link
                    to="/myunit-landlord/managerenters"
                    className={`${styles["box-1_container"]} `}
                >
                    <div className={`${styles["box-1"]} `}>
                        <IoPeopleSharp size={75} className={styles["icon"]} />
                        <p>MANAGE RENTERS</p>
                    </div>
                </Link>

                <Link
                    to="/manage_unit"
                    className={`${styles["box-2_container"]} `}
                >
                    <div className={`${styles["box-2"]} `}>
                        <TbBuildingCommunity
                            size={75}
                            className={styles["iconbox"]}
                        />
                        <p>MANAGE UNITS</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MyUnit;
