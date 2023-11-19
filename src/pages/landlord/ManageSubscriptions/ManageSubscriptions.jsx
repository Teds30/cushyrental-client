import { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import styles from "./ManageSubscriptions.module.css";
import { FiChevronLeft } from "react-icons/fi";
import ManageTabs from "./ManageTabs.jsx";

const ManageSubscriptions = () => {
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const navigate = useNavigate();

    return (
        <div className={`${styles["manage-unit-container"]}`}>
            <Fragment>
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
                        <Toolbar className={`${styles["toolbar-container"]}`}>
                            <Link
                                to="/myunit-landlord"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(-1);
                                }}
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
                                            color: "var(--fc-strong)",
                                            fill: "transparent",
                                        }}
                                    />
                                </IconButton>
                            </Link>
                            <Box
                                sx={{ marginLeft: "-12px" }}
                                className={`${styles["manage-unit-title"]}`}
                            >
                                <p className="title">Manage Subscriptions</p>
                                <p className="smaller-text">
                                    {userSubscriptions.length} Subscriptions
                                </p>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>

                <div className={`${styles["main-container"]}`}>
                    <ManageTabs
                        userSubscriptions={userSubscriptions}
                        setUserSubscriptions={setUserSubscriptions}
                    />
                </div>
            </Fragment>
        </div>
    );
};

export default ManageSubscriptions;
