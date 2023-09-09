import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import ManageUnitTabs from "./ManageUnitTable";
import useUserManager from "../../../../hooks/data/users-hook";

import styles from "./ManageUnit.module.css";
import { FiChevronLeft } from "react-icons/fi";

const ManageUnit = () => {
    const { id } = useParams();
    const { fetchUserUnits, isLoading } = useUserManager();

    const [userUnits, setUserUnits] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUserUnits(id);
                setUserUnits(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={`${styles["manage-unit-container"]}`}>
            {isLoading ? (
                ""
            ) : (
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
                            <Toolbar
                                className={`${styles["toolbar-container"]}`}
                            >
                                <Link className={`${styles["link-button"]}`}>
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
                                    className={`${styles["manage-unit-title"]}`}
                                >
                                    <p className="title">Manage Units</p>
                                    <div className="pre-title">
                                        {isLoading
                                            ? ""
                                            : userUnits.length === 0
                                            ? userUnits.length + " Unit"
                                            : userUnits.length === 1
                                            ? userUnits.length + " Unit"
                                            : userUnits.length + " Units"}{" "}
                                    </div>
                                </Box>
                            </Toolbar>
                        </AppBar>
                    </Box>

                    <div className={`${styles["main-container"]}`}>
                        <ManageUnitTabs userUnits={userUnits} />
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default ManageUnit;
