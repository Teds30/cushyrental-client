import { useState } from "react";
import { Link } from "react-router-dom";

import TextField from "../../../components/TextField/TextField";
import Dropdown from "../../../components/Dropdown/Dropdown";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import useValidate from "../../../hooks/validate-input-hook";
import BorderlessButton from "../../../components/Button/BorderlessButton";

import styles from "./CreateAccount.module.css";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import google from "../../../assets/google.svg";

const CreateAccountForm = (props) => {
  const { onCreateAccount, isLoading, onGoogleAuth } = props;

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
  } = useValidate((value) => value.trim() !== "");
  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: enteredConfirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset,
  } = useValidate((value) => enteredPassword === value);

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
      gender: enteredGender === "Male" ? "1" : "2",
      phone_number: enteredPhoneNumber,
    });

    firstNameReset();
    lastNameReset();
    genderReset();
    phoneNumberReset();
    emailReset();
    passwordReset();
    confirmPasswordReset();
  };

  const googleAuthHandler = () => {
    onGoogleAuth();
  };

  return (
    <form className={`${styles["form-container"]}`} onSubmit={submitHandler}>
      <div className={`${styles["form-container-identity"]}`}>
        <TextField
          fullWidth
          label="First Name"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          helperText={
            enteredFirstNameHasError && "Please enter your first name."
          }
          error
        />
        <TextField
          fullWidth
          label="Last Name"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          helperText={enteredLastNameHasError && "Please enter your last name."}
          error
        />
      </div>

      <div className={`${styles["form-container-info"]}`}>
        <Dropdown
          fullWidth
          label="Gender"
          selected={enteredGender}
          items={[
            { id: 0, name: "Male" },
            { id: 1, name: "Female" },
          ]}
          handleSelect={genderChangeHandler}
          onBlur={genderBlurHandler}
          selectedValue={enteredGender}
          // helperText={
          //   enteredGenderHasError && "Please select your gender."
          // }
          // error
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
            enteredEmailHasError && "Please enter your valid email address."
          }
          error
        />
        <TextField
          type="password"
          fullWidth
          label="Password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          helperText={enteredPasswordHasError && "Please enter your password."}
          error
        />
        <TextField
          type="password"
          fullWidth
          label="Confirm Password"
          value={enteredConfirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          helperText={
            enteredConfirmPasswordHasError && "Please confirm your password."
          }
          error
        />
      </div>

      <div className={`${styles["sign-up-btn"]}`}>
        <PrimaryButton
          width="100%"
          disabled={!formIsValid}
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
        <BorderlessButton onClick={googleAuthHandler}>
          <div className={styles["back"]}>
            <FacebookOutlinedIcon size="large" style={{ color: "#4267B2" }} />{" "}
            Facebook
          </div>
        </BorderlessButton>

        <a href="http://127.0.0.1:8000/auth/google/redirect">
          <div className={styles["back"]}>
            <img src={google} alt="Google Icon" className={styles.googleIcon} />{" "}
            Google
          </div>
        </a>
      </div>

      <div className={`${styles["login-option"]}`}>
        <span>Already have an account? </span>
        <span>
          <Link to={"/signinpage"} className={styles.login}>
            Log In
          </Link>
        </span>
      </div>
    </form>
  );
};

export default CreateAccountForm;
