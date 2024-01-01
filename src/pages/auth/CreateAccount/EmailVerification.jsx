import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import styles from "../../Login/ForgotPassword.module.css";
import { FiChevronLeft } from "react-icons/fi";
import EmailVerificationOTP from "./EmailVerificationOTP";

const EmailVerification = (props) => {
    const {data, onRegistration} = props;

    const backHandler = () => {
        onRegistration();
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
                        <Link onClick={backHandler}>
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
                            <p className="title">EMAIL VERIFICATION</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <EmailVerificationOTP email={data.email} data={data}/>
        </div>
    );
};

export default EmailVerification;