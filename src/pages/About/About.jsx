import React from "react";
import styles from "./About.module.css";

const About = () => {
    return (
        <div className={`${styles["main-container"]}`}>
            <div className={`${styles["nav-container"]}`}>
                <div>
                    <p>Cushy Rental</p>
                </div>
                <div className={`${styles["nav-mid-container"]}`}>
                    <p>Home</p>
                    <p>Home</p>
                    <p>Home</p>
                </div>
                <div >
                    <button className={`${styles["button-container"]}`}> Board now</button>
                </div>
            </div>

            <div className={`${styles["header-container"]}`}>
                <div>
                    
                </div>
                <p className={`${styles["header-title"]}`} >Experience cozy lodging</p>
                <p>Discover and inquire units around Legazpi City</p>
            </div>

            <div className={`${styles["mvision-container"]}`}>
                <div className={`${styles["mission-container"]}`}>
                    <p>Our Mission</p>
                    <p>
                              Cushy Rental is committed to revolutionizing the
                        traditional way of seeking boarding houses for students
                        and relying on the word of mouth of landlords. We aim to
                        provide a user-friendly and comprehensive platform that
                        simplifies the rental process, fosters trust between
                        students and landlords, and creates a safe and secure
                        community for all.
                    </p>
                </div>
                <div className={`${styles["vission-container"]}`}>
                    To be the go-to-online platform for students to find and
                    rent the perfect boarding house, promote, and advertise
                    landlords’ units, and foster a community of trust,
                    transparency, and accessibility.
                </div>
            </div>

            <div className={`${styles["team-container"]}`}>
                <div>
                    <p>Meet the Team</p>
                    <p>Locates innovative solution aligning to your needs</p>
                </div>

                <div className={`${styles["avatar-container"]}`}>
                    <div>
                        <p>ELA MAE</p>
                        <p>Project Manager</p>
                    </div>
                    <div>
                        <p>TEDDY MARC</p>
                        <p>Lead Developer</p>
                    </div>
                    <div>
                        <p>JOHN ARJIE</p>
                        <p>Developer</p>
                    </div>
                    <div>
                        <p>JOHN</p>
                        <p>Developer</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
