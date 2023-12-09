import { useState } from "react";
import { Link } from "react-router-dom";
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";

import TextField from "../../../components/TextField/TextField";
import Dropdown from "../../../components/Dropdown/Dropdown";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import useValidate from "../../../hooks/validate-input-hook";

import styles from "./CreateAccount.module.css";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import google from "../../../assets/google.svg";
import TextFieldAdornedPassword from "../../../components/TextFieldAdorned/TextFieldAdornedPassword";

const CreateAccountForm = (props) => {
    const { onCreateAccount, isLoading, onGoogleAuth, onfacebookAuth } = props;

    const regex = /^(?=.*\d)(?=.*[!@#$%^&*._])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: enteredFirstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: firstNameReset,
    } = useValidate((value) => value.trim() !== "");
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: enteredLastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: lastNameReset,
    } = useValidate((value) => value.trim() !== "");
    const {
        value: enteredGender,
        isValid: enteredGenderIsValid,
        hasError: enteredGenderHasError,
        valueChangeHandler: genderChangeHandler,
        inputBlurHandler: genderBlurHandler,
        reset: genderReset,
    } = useValidate((value) => value.trim() !== "");
    const {
        value: enteredPhoneNumber,
        isValid: enteredPhoneNumberIsValid,
        hasError: enteredPhoneNumberHasError,
        valueChangeHandler: phoneNumberChangeHandler,
        inputBlurHandler: phoneNumberBlurHandler,
        reset: phoneNumberReset,
    } = useValidate((value) => {
        // Check if the value contains a plus sign, is a valid number, and not empty
        const isValueValidWithPlus =
            value.includes("+") && Number(value) && value.trim() !== "";

        // Check if the value is a valid number and not empty
        const isValueValid = Number(value) && value.trim() !== "";

        // The final condition: If either of the above conditions is true, return true
        return isValueValidWithPlus || isValueValid;
    });
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useValidate((value) => value.trim() !== "");
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.length >= 8 && regex.test(value)
    );
    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmPasswordIsValid,
        hasError: enteredConfirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: confirmPasswordReset,
    } = useValidate((value) => enteredPassword === value);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    let formIsValid;

    if (
        enteredFirstNameIsValid &&
        enteredLastNameIsValid &&
        enteredGenderIsValid &&
        enteredPhoneNumberIsValid &&
        enteredEmailIsValid &&
        enteredPasswordIsValid &&
        enteredConfirmPasswordIsValid
    ) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        onCreateAccount({
            email: enteredEmail,
            password: enteredPassword,
            password_confirmation: enteredConfirmPassword,
            first_name: enteredFirstName,
            last_name: enteredLastName,
            gender:
                enteredGender === "Male"
                    ? "1"
                    : enteredGender === "Female"
                    ? "2"
                    : "3",
            phone_number: enteredPhoneNumber,
        });

        // firstNameReset();
        // lastNameReset();
        // genderReset();
        // phoneNumberReset();
        // emailReset();
        // passwordReset();
        // confirmPasswordReset();
    };

    const registerGoogleAuthHandler = () => {
        onGoogleAuth();
    };

    // const responseFacebook = () => {
    //     onfacebookAuth();
    // };

    

    return (
        <form
            className={`${styles["form-container"]}`}
            onSubmit={submitHandler}
        >
            <div className={`${styles["form-container-identity"]}`}>
                <TextField
                    fullWidth
                    label="First Name"
                    value={enteredFirstName}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    helperText={
                        enteredFirstNameHasError &&
                        "Please enter your first name."
                    }
                    error
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    value={enteredLastName}
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    helperText={
                        enteredLastNameHasError &&
                        "Please enter your last name."
                    }
                    error
                />
            </div>

            <div className={`${styles["form-container-info"]}`}>
                <Dropdown
                    fullWidth
                    label="Gender"
                    value={enteredGender}
                    items={[
                        { id: 0, name: "Male" },
                        { id: 1, name: "Female" },
                        { id: 2, name: "Not to specify" },
                    ]}
                    handleSelect={genderChangeHandler}
                    onBlur={genderBlurHandler}
                    selected={enteredGender}
                    errorText={
                        enteredGenderHasError && "Please select your gender."
                    }
                    error={enteredGenderHasError}
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    value={enteredPhoneNumber}
                    onChange={phoneNumberChangeHandler}
                    onBlur={phoneNumberBlurHandler}
                    helperText={
                        enteredPhoneNumberHasError &&
                        "Please enter your valid mobile number."
                    }
                    error
                />
                <TextField
                    type="email"
                    fullWidth
                    label="Email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    helperText={
                        enteredEmailHasError &&
                        "Please enter your valid email address."
                    }
                    error
                />
                <TextFieldAdornedPassword
                    label="Password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    helperText={
                        enteredPasswordHasError &&
                        "Password must contain 8+ characters, symbol, upper and lowercase letters and a number."
                    }
                />

                <TextFieldAdornedPassword
                    label="Confirm Password"
                    value={enteredConfirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordBlurHandler}
                    helperText={
                        enteredConfirmPasswordHasError &&
                        "Please confirm your password."
                    }
                />
            </div>

            <div className={`${styles["sign-up-btn"]}`}>
                <PrimaryButton
                    width="100%"
                    isLoading={isLoading}
                    loadingText="SIGNING UP"
                >
                    SIGN UP
                </PrimaryButton>
            </div>

            <div className={`${styles["sign-up-socmed"]}`}>
                <div className={styles.hr}></div>
                <div className={styles.option}>Or Sign Up with</div>
                <div className={styles.hr}></div>
            </div>

            <div className={styles.socmed}>
                {/* <button onClick={fbLogin}>Facebook</button> */}
                {/* <Link
                            onClick={responseFacebook}
                            // disabled={disabled}
                            className="facebook-login-button"
                        >
                            <div className={styles["back"]}>
                                <FacebookOutlinedIcon
                                    size="large"
                                    style={{ color: "#4267B2" }}
                                />{" "}
                                Facebook
                            </div>
                        </Link> */}

                <Link
                    onClick={registerGoogleAuthHandler}
                    style={{ width: "100%" }}
                >
                    <div className={styles["back"]}>
                        <img
                            src={google}
                            alt="Google Icon"
                            className={styles.googleIcon}
                        />{" "}
                        Google
                    </div>
                </Link>
            </div>

            <div className={`${styles["login-option"]}`}>
                <span>Already have an account? </span>
                <span>
                    <Link to={"/signin"} className={`${styles["login-word"]}`}>
                        Log In
                    </Link>
                </span>
            </div>
        </form>
    );
};

export default CreateAccountForm;
