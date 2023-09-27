import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextField from "../../components/TextField/TextField";
import Dropdown from "../../components/Dropdown/Dropdown";
import PrimaryButton from "../../components/Button/PrimaryButton";
import useUserManager from "../../hooks/data/users-hook";
import AuthContext from "../../context/auth-context";
import useNotistack from "../../hooks/notistack-hook";

import styles from "./EditProfile.module.css";
import photo from "../../assets/Units/pics.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const EditProfileForm = (props) => {
    const { userData = {} } = props;
    const { updateUser } = useUserManager();
    const userCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { notify } = useNotistack();

    const [user, setUser] = useState(userData);
    const [newIimage, setNewImage] = useState({});
    const [firstName, setFirstName] = useState(userData.first_name);
    const [middleName, setMiddleName] = useState(userData.middle_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [isSaving, setISaving] = useState(false);

    const addImageChangeHandler = (event) => {
        const image = URL.createObjectURL(event.target.files[0]);
        setNewImage({
            file: event.target.files[0],
            image: image,
            name: event.target.files[0].name,
        });
    };

    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value);
    };

    const middleNameChangeHandler = (event) => {
        setMiddleName(event.target.value);
    };

    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value);
    };

    const numberChangeHandler = (event) => {
        setUser({ ...user, phone_number: event.target.value });
    };

    const genderChangeHandler = (event) => {
        const gender = event.target.value;
        setUser({
            ...user,
            gender: gender === "Male" ? 0 : gender === "Fema" ? 1 : 2,
        });
    };

    const handleFileUpload = async () => {
        const formData = new FormData();

        formData.append("image", newIimage.file);
        formData.append("name", newIimage.name);
        formData.append("path", "images");

        try {
            const res = await fetch("http://127.0.0.1:8000/api/image-upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            const userUpdate = {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                phone_number: user.phone_number,
                gender: user.gender.toString(),
                profile_picture_img: data.name,
            };

            const resUpdate = await updateUser(userUpdate, user.id);
            userCtx.onLogin(resUpdate, userCtx.token);
            navigate("/profile");
            notify("User update successfully!", "success");
        } catch (err) {}
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        setISaving(true);

        if (Object.keys(newIimage).length > 0) {
            handleFileUpload();
        } else {
            try {
                const userUpdate = {
                    first_name: firstName,
                    middle_name: middleName,
                    last_name: lastName,
                    phone_number: user.phone_number,
                    gender: user.gender.toString(),
                    profile_picture_img: user.profile_picture_img,
                };

                const resUpdate = await updateUser(userUpdate, user.id);
                userCtx.onLogin(resUpdate, userCtx.token);
                navigate("/profile");
                notify("User update successfully!", "success");
            } catch (err) {}
        }
    };

    return (
        <div className={`${styles["edit-profile-main"]}`}>
            <div className={`${styles["user-details"]}`}>
                <div className={styles.photo}>
                    <img
                        src={
                            Object.keys(newIimage).length === 0
                                ? user.profile_picture_img
                                : newIimage.image
                        }
                        alt={
                            Object.keys(newIimage).length === 0
                                ? user.name
                                : newIimage.name
                        }
                    />
                    <div className={`${styles["edit-profile"]}`}>
                        <CameraAltIcon className={`${styles["camera-icon"]}`} />
                    </div>
                    <div className={`${styles["edit-input"]}`}>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={addImageChangeHandler}
                            multiple={false}
                        />
                    </div>
                </div>
                <p className="title">
                    {user.first_name}{" "}
                    {user.middle_name !== "middle_name" && user.middle_name}{" "}
                    {user.last_name}
                </p>
                <p className="smaller-text">
                    {user.user_type_id === 1 ? "Tenant" : "Landlord"}
                </p>
            </div>

            <form onSubmit={submitHandler} className={`${styles["user-data"]}`}>
                <div className={`${styles["user-data-col"]}`}>
                    <TextField
                        fullWidth
                        label="First Name"
                        defaultValue={firstName}
                        onChange={firstNameChangeHandler}
                        helperText={
                            firstName === "" && "Please enter your first name."
                        }
                        error
                    />

                    <TextField
                        fullWidth
                        label="Middle Name"
                        defaultValue={middleName}
                        onChange={middleNameChangeHandler}
                        helperText={
                            middleName === "" &&
                            "Please enter your middle name."
                        }
                        error
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue={lastName}
                        onChange={lastNameChangeHandler}
                        helperText={
                            lastName === "" && "Please enter your last name."
                        }
                        error
                    />
                </div>

                <div className={`${styles["user-data-col"]}`}>
                    <TextField
                        fullWidth
                        label="Contact Number"
                        defaultValue={user.phone_number}
                        onChange={numberChangeHandler}
                        helperText={
                            user.phone_number === "" &&
                            "Please enter your cellular number."
                        }
                        error
                    />

                    <Dropdown
                        fullWidth
                        label="Gender"
                        selected={
                            user.gender === 0
                                ? "Male"
                                : user.gender === 1
                                ? "Female"
                                : "Not to specify"
                        }
                        items={[
                            { id: 0, name: "Male" },
                            { id: 1, name: "Female" },
                            { id: 2, name: "Not to specify" },
                        ]}
                        handleSelect={genderChangeHandler}
                        // selectedValue={user.gender}
                    />

                    {user.is_verified !== false ? (
                        <div
                            // to="/profile/user_profile/verify/1"
                            className={`${styles["verify-account"]}`}
                            style={{ textDecoration: "none" }}
                        >
                            <ErrorOutlineIcon />
                            <p>Your account is verified</p>
                        </div>
                    ) : (
                        <Link
                            to="/profile/user_profile/verify/1"
                            className={`${styles["verify-account"]}`}
                            style={{ textDecoration: "none" }}
                        >
                            <ErrorOutlineIcon
                                style={{ fill: "var(--accent-danger)" }}
                            />
                            <p style={{ color: "var(--accent-danger)" }}>
                                Verifying your account
                            </p>
                        </Link>
                    )}
                </div>

                <div className={`${styles["edit-profile-button"]}`}>
                    <PrimaryButton
                        width="100%"
                        isLoading={isSaving}
                        loadingText="Saving"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;