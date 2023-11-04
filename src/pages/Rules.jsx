import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Logo from "../assets/cushyrental.svg";
import { FiChevronLeft } from "react-icons/fi";

import styles from "./Rules.module.css";

const Rules = () => {
    return (
        <div className={`${styles["main-container"]} `}>
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
                    <Toolbar>
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
                        <Box sx={{ flexGrow: 1 }}>
                            <p className="title">Rules and Regulations</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["main-box-container"]} `}>
                <div className={`${styles["box-container"]} `}>
                    <div>
                        {" "}
                        <h2>General</h2>{" "}
                    </div>
                    <div className={styles["hr"]}></div>
                    <div className={styles["caption"]}>
                        <p className={styles["indent"]}>
                            {" "}
                            By using CushyRental, users are accepting to follow
                            the required guidelines and policies set by the
                            administrator. Also, it is important to be aware of
                            general rules and information security to have a
                            safe and healthy system, and serve its purpose.
                        </p>
                    </div>
                </div>

                <div className={`${styles["box-container"]} `}>
                    <div>
                        {" "}
                        <h2>Usage</h2>
                    </div>
                    <div className={styles["hr"]}></div>
                    <div className={styles["caption"]}>
                        <p className={styles["indent"]}>
                            As CushyRental strives to provide real-time
                            information and updates to users, the system is
                            requiring its users especially registered landlords
                            to keep their accounts active. Renters availing unit
                            will only last for 24 hours, after a day without
                            confirmation to the request, the request will
                            automatically cancel. This measure is necessary to
                            prevent lengthier waiting times for boarding home
                            finders and to guarantee that the platform will
                            continue to deliver current and correct data.
                        </p>
                    </div>
                </div>

                <div className={`${styles["box-container"]} `}>
                    <div>
                        {" "}
                        <h2>Privacy and Confidentiality</h2>
                    </div>
                    <div className={styles["hr"]}></div>
                    <div className={styles["caption"]}>
                        <p className={styles["indent"]}>
                            In compliance with the guidelines established by the
                            Data Privacy Act of 2012, CushyRental respects the
                            information provided by its users. In terms of
                            protecting the user's personal information,
                            administrator implemented procedures to assure
                            security. The system only gathers data that is
                            pertinent to interactions with its user. These
                            details will be kept private as required by law and
                            are pertinent to the objectives for which they were
                            gathered.
                        </p>
                        <p>
                            <span>Account Protection. </span>The user's password
                            is crucial to the security of the account. It is
                            recommended to utilize original numbers, letters,
                            and special characters and to keep your password a
                            secret. If you conduct actions like disclosing your
                            password or personal information to other users, the
                            system or administrator will not be held liable if
                            you lose significant control over your personal
                            data. If your password or account has been
                            compromised for any reason, reset it and alert the
                            administrator in which contact information is stated
                            on CushyRental's About page.
                        </p>
                    </div>
                </div>

                <div className={`${styles["box-container"]} `}>
                    <div>
                        {" "}
                        <h2>Reports</h2>
                    </div>
                    <div className={styles["hr"]}></div>
                    <div className={styles["caption"]}>
                        {" "}
                        <p className={styles["indent"]}>
                            In order to maintain a secure and effective
                            environment for everyone, CushyRental includes
                            report buttons to encourage users to utilize this
                            feature in the event of any misconduct or violation
                            of policies. Penalties will vary depending on the
                            committed violation of a user. Reasons for report
                            are based from the violations provided below:{" "}
                        </p>
                        <p>
                            <span>Scam.</span> CushyRental will ensure that the
                            platform is used with good purpose. This also aims
                            to maintain the integrity of the community and will
                            not tolerate any behavior that puts users at risk.
                        </p>
                        <p>
                            <span>Unrelated Uploads.</span> Registered and
                            verified landlords are responsible for uploading
                            relevant photos of their boarding houses. Any
                            unrelated uploads will be subject to reporting and
                            penalties.
                        </p>
                        <p>
                            <span>Irrelevant Reviews and Profanity.</span>{" "}
                            CushyRental encourages users to have a healthy
                            relationship and conversations. Thus, any irrelevant
                            reviews or profanity-filled comments and messages
                            while using the system is strictly prohibited.
                        </p>
                        <p>
                            {" "}
                            During the reporting process, the administrator have
                            the ability to check the users’ conversation within
                            the system, thus, negotiation in chat system serves
                            as vital proof.
                        </p>
                    </div>
                </div>

                <div className={`${styles["bottom-container"]} `}>
                    <div className={`${styles["logo-container"]} `}>
                        <img
                            src={Logo}
                            alt="Cushy Rental Icon"
                            className={styles["logo"]}
                        />{" "}
                    </div>
                    <div className={styles["caption"]}>
                        <p>All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rules;
