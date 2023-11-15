import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";

import styles from "./ForgotPassword.module.css";
import { FiChevronLeft } from "react-icons/fi";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import { useState } from "react";
import ForgotPasswordUpdatePassword from "./ForgotPasswordUpdatePasswordd";

const ForgotPasswordMain = () => {
    const [step, setStep] = useState(1);
    // const [ email, setEmail ] = useState('');
    const [user, setUser] = useState({});

    const emailHandler = (user) => {
        setStep(step + 1);
        setUser(user);
    };

    const verifiedHandler = () => {
        setStep(step + 1);
    };

    let content;

    if (step === 1) {
        content = <ForgotPasswordEmail onEmail={emailHandler} />;
    } else if (step === 2) {
        content = (
            <ForgotPassword email={user.email} onVerified={verifiedHandler} />
        );
    } else {
        content = <ForgotPasswordUpdatePassword user={user} />;
    }

    return (
        <div className={`${styles["main-container"]}`}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
                        <Link to={`/signin`}>
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
                            <p className="title">FORGOT PASSWORD</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {content}
        </div>
    );
};

export default ForgotPasswordMain;
