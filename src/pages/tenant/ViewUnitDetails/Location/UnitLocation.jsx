import { useParams, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import PrimaryButton from "../../../../components/Button/PrimaryButton";

import styles from "./UnitLocation.module.css";
import { FiChevronLeft } from "react-icons/fi";

const UnitLocation = () => {
    const { id } = useParams();

    return (
        <div className={`${styles["location-container"]}`}>
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
                            to={`/unit/${id}`}
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     navigate(-1);
                            // }}
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
                        <Box className={`${styles["manage-unit-title"]}`}>
                            <p className="title">Location</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default UnitLocation;
