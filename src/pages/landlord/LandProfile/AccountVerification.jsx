import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import AccountVerificationDesign from "./AccountVerificationDesign";
import AccountVerificationProcess from "./AccountVerificationProcess";
import { VerifyAccountContextProvider } from "../../../context/verify-account-context";

import styles from "./AccountVerification.module.css";
import { FiChevronLeft } from "react-icons/fi";

const AccountVerification = () => {
    return (
        <VerifyAccountContextProvider>
            <div className={`${styles["account-verification-container"]}`}>
                <AccountVerificationDesign />
                <Box className={`${styles["top-back-container"]} `}>
                    <AppBar
                        position="static"
                        sx={{
                            margin: 0,
                            backgroundColor: "var(--accent-dark)",
                            color: "var(--fc-body)",
                            fontFamily: "Inter",
                            boxShadow: "none",
                            // borderBottom: "1px solid var(--border-color)",
                        }}
                    >
                        <Toolbar className={`${styles["toolbar-container"]}`}>
                            <Link
                                to={`/profile/user_profile/1`}
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
                                    Account Verification
                                </p>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>

                <AccountVerificationProcess
                    className={`${styles["account-verification-process"]}`}
                />
            </div>
        </VerifyAccountContextProvider>
    );
};

export default AccountVerification;
