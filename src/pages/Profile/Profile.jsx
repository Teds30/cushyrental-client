import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import AuthContext from "../../context/auth-context";
import ProfileDesign from "./ProfileDesign";
import BorderedButton from "../../components/Button/BorderedButton";
import LandLordProfile from "../landlord/LandProfile/LandLordProdile";

import styles from "./Profile.module.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import { FiChevronLeft } from "react-icons/fi";
import { LiaScrollSolid } from "react-icons/lia";
import photo from "../../assets/Units/pics.png";
import logo from "../../assets/cushyrental.svg";

const Profile = () => {
    // const userCtx = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className={`${styles["profile-container"]}`}>
            <ProfileDesign className={`${styles["profile-design"]}`} />

            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                        // borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar className={`${styles["toolbar-container"]}`}>
                        <Link
                            to={`/manage_unit/edit/`}
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
                        <Box className={`${styles["edit-feature-title"]}`}>
                            <p className="title">PROFILE</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["profile-main"]}`}>
                <div className={`${styles["profile-user"]}`}>
                    <div className={`${styles["user-profile"]}`}>
                        <div className={`${styles["photo"]}`}>
                            <img src={photo} alt="CushyRental" />
                        </div>
                        <div className={`${styles["user"]}`}>
                            <div className={styles.name}>
                                <p
                                    className="title"
                                    style={{ fontSize: "16px" }}
                                >
                                    Teddy Marc Enaje
                                </p>
                                <VerifiedIcon
                                    style={{ color: "var(--accent)" }}
                                />
                            </div>
                            <p>Landlord</p>
                        </div>
                    </div>

                    <div className={`${styles["user-menu"]}`}>
                        <LandLordProfile />
                    </div>
                </div>

                <div className={`${styles["about-section"]}`}>
                    <p className="title" style={{ fontSize: "16px" }}>
                        Abouts
                    </p>

                    <div className={styles["hr"]}></div>

                    <div className={`${styles["about-row"]}`}>
                        <Link className={`${styles["about-col"]}`}>
                            <div className={`${styles["about-image"]}`}>
                                <img src={logo} alt="CushyRental" />
                            </div>
                            <p className="smaller-text">CushyRental</p>
                        </Link>

                        <Link to='/rules' className={`${styles["about-col"]}`}>
                            <div className={`${styles["about-rule"]}`}>
                                <div className={`${styles["rule"]}`}>
                                    <LiaScrollSolid
                                        style={{
                                            height: "44px",
                                            width: "44px",
                                            fill: "var(--accent",
                                        }}
                                    />
                                </div>
                            </div>
                            <p className="smaller-text">Rule and Regulations</p>
                        </Link>
                    </div>
                </div>

                <div className={`${styles["profile-button"]}`}>
                    <Link>
                        <BorderedButton btnType="danger" width='100%'>Logout</BorderedButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
