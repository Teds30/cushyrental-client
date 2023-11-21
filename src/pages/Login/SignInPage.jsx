import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";

import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextField from "../../components/TextField/TextField";
import CheckBox from "../../components/CheckBox/CheckBox";
import Logo from "../../assets/cushyrental.svg";
import useLogin from "../../hooks/data/login-hook";
import SocialMediaLogin from "./SocialMedia";
import AuthContext from "../../context/auth-context";
import Alert from "../../components/Alert/Alert";
import TextFieldAdornedPassword from "../../components/TextFieldAdorned/TextFieldAdornedPassword";
import useValidate from "../../hooks/validate-input-hook";

const SignInPage = () => {
    const { loginUser, isLoading } = useLogin();
    const [isInvalid, setIsInvalid] = useState(false);
    // const [emailInput, setEmailInput] = useState("");
    // const [passwordInput, setPasswordInput] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const regex = /^(?=.*\d)(?=.*[!@#$%^&*._])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const {
        value: emailInput,
        isValid: enteredEmailInputValid,
        hasError: enteredEmailInputHasError,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: emailInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" &&
            value.includes("@") &&
            value.includes("gmail") &&
            value.includes(".com")
    );

    const {
        value: passwordInput,
        isValid: enteredPasswordInputIsValid,
        hasError: enteredPasswordInputHasError,
        valueChangeHandler: passwordInputChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: passwordInputReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.length >= 8 && regex.test(value)
    );

    const [checkBoxItems, setCheckBoxItems] = useState([]);
    const userCtx = useContext(AuthContext);
    const navigate = useNavigate();

    let formIsValid = false;

    if (enteredEmailInputValid && enteredPasswordInputIsValid) {
        formIsValid = true;
    }

    // const handleEmailChange = (event) => {
    //     setEmailInput(event.target.value);
    //     setEmailError("");
    // };

    // const handlePasswordChange = (event) => {
    //     setPasswordInput(event.target.value);
    //     setPasswordError("");
    // };

    // const handleEmailBlur = () => {
    //     if (emailInput === "") {
    //         setEmailError("Email is required.");
    //     }
    // };

    // const handlePasswordBlur = () => {
    //     if (passwordInput === "") {
    //         setPasswordError("Password is required.");
    //     }
    // };

    const rememberMeHandler = (items) => {
        setCheckBoxItems(items);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        try {
            const res = await loginUser({
                email: emailInput,
                password: passwordInput,
            });

            if (res.token) {
                setIsInvalid(false);
                userCtx.onLogin({ user: res.user, token: res.token });
                navigate("/");
            } else {
                setIsInvalid(true);
            }
        } catch (error) {}
    };

    return (
        <form
            className={`${styles["main-container"]} `}
            onSubmit={handleSubmit}
        >
            <div>
                <div className="logo">
                    <img src={Logo} alt="Cushy Rental Icon" />{" "}
                </div>

                <div className={`${styles["component-title"]} `}>
                    <h2>Sign In to</h2>
                    <h2 className={`${styles["component-title1"]} `}>Cushy Rental</h2>
                </div>
            </div>

            <div className={`${styles["sign-in"]} `}>
                {isInvalid && <Alert />}
                <div className={`${styles["textfield_container"]} `}>
                    <div className={`${styles["custom__inputs"]} `}>
                        {/* <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={emailInput}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                        <p className={styles["error"]}>{emailError}</p> */}
                    <TextField
                        type="email"
                        fullWidth
                        label="Email"
                        value={emailInput}
                        onChange={emailInputChangeHandler}
                        onBlur={emailInputBlurHandler}
                        helperText={
                            enteredEmailInputHasError &&
                            "Please enter your valid email address."
                        }
                        error
                    />
                    </div>

                    <div className={`${styles["custom__inputs"]} `}>
                        {/* <TextFieldAdornedPassword
                            label="Password"
                            type="password"
                            value={passwordInput}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            helperText={
                                passwordError && "Please confirm your password."
                            }
                    /> */}
                    <TextFieldAdornedPassword
                    label="Password"
                    value={passwordInput}
                    onChange={passwordInputChangeHandler}
                    onBlur={passwordInputBlurHandler}
                    helperText={
                        enteredPasswordInputHasError &&
                        "Password must contain 8+ characters, symbol, upper and lowercase letters and a number."
                    }
                    />
                        {/* <div className={styles['error']}>{passwordError}</div> */}
                    </div>
                </div>

                <div className={`${styles["remember-forgot"]} `}>
                    <div className={`${styles["remember-me"]} `}>
                        {/* <CheckBox
                            items={[{ id: 1, name: "Remember Me" }]}
                            onCheckBox={rememberMeHandler}
                        /> */}
                    </div>
                    <div className={`${styles["remember-me"]} `}>
                        <Link
                            to="/signin/forgotpassword"
                            className={`${styles["forgot-password"]} `}
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <div className={`${styles["loginButton-container"]} `}>
                    <PrimaryButton type="submit" isLoading={isLoading} width="100%" loadingText="LOGIN">
                        LOGIN
                    </PrimaryButton>
                </div>

                <div>
                    <div className={`${styles["sign-up__container"]}`}>
                        <div className={styles.hr}></div>
                        <div className={styles.option}>Or Sign Up with</div>
                        <div className={styles.hr}></div>
                    </div>

                    <SocialMediaLogin />
                </div>

                <div className={`${styles["login-option"]}`}>
                    <span>Don't have an account? </span>
                    <span className={`${styles["signup-link"]}`}>
                        <Link
                            to="/register"
                            className={`${styles["signup-word"]}`}
                        >
                            Sign Up
                        </Link>
                    </span>
                </div>
            </div>
        </form>
    );
};

export default SignInPage;
