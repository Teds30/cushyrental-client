import React from "react";

import TextField from "../../components/TextField/TextField";
import Dropdown from "../../components/Dropdown/Dropdown";
import { Link } from "@mui/material";
import PrimaryButton from "../../components/Button/PrimaryButton";

import styles from "./EditProfile.module.css";
import photo from "../../assets/Units/pics.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const EditProfileForm = (props) => {
    return (
        <div className={`${styles["edit-profile-main"]}`}>
            <div className={`${styles["user-details"]}`}>
                <div className={styles.photo}>
                    <img src={photo} alt="CushyRental" />
                    <div className={`${styles["edit-profile"]}`}>
                        <CameraAltIcon className={`${styles["camera-icon"]}`} />
                    </div>
                    <div className={`${styles["edit-input"]}`}>
                        <input type="file" accept=".jpg, .jpeg, .png" />
                    </div>
                </div>
                <p className="title">Teddy Marc Enaje</p>
                <p className="smaller-text">Landlord</p>
            </div>

            <form className={`${styles["user-data"]}`}>
                <div className={`${styles["user-data-col"]}`}>
                    <TextField fullWidth label="First Name" />

                    <TextField fullWidth label="Middle Name" />

                    <TextField fullWidth label="Last Name" />
                </div>

                <div className={`${styles["user-data-col"]}`}>
                    <TextField fullWidth label="Contact Number" />

                    <Dropdown
                        fullWidth
                        label="Gender"
                        //   selected={enteredGender}
                        items={[
                            { id: 0, name: "Male" },
                            { id: 1, name: "Female" },
                            { id: 2, name: "Not to specify" },
                        ]}
                        // handleSelect={genderChangeHandler}
                        // selectedValue={enteredGender}
                    />

                    <Link className={`${styles['verify-account']}`} style={{textDecoration: 'none'}}>
                        <ErrorOutlineIcon/>
                        <p>Verifying you account</p>
                    </Link>
                </div>

                <div className={`${styles['edit-profile-button']}`}>
                    <PrimaryButton width='100%'>Save</PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
