import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import styles from "./EditProfile.module.css";
import { FiChevronLeft } from "react-icons/fi";
import EditProfileDesign from "./EditProfileDesign";
import EditProfileForm from "./EditProfileForm";

import photo from "../../assets/Units/pics.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const EditProfile = () => {
    return (
        <div className={`${styles["edit-profile-container"]}`}>
            <EditProfileDesign className={`${styles["edit-profile-design"]}`} />
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
                            to={`/profile`}
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
                                        color: "var(--bg-layer1)",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box className={`${styles["edit-feature-title"]}`}>
                            <p
                                className="title"
                                style={{ color: "var(--bg-layer1)" }}
                            >
                                PROFILE
                            </p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <EditProfileForm/>
        </div>
    );
};

export default EditProfile;
