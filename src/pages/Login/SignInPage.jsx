import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";

import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextField from "../../components/TextField/TextField";
import CheckBox from "../../components/CheckBox/CheckBox";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Google from "../../assets/google.svg";
import Logo from "../../assets/cushyrental.svg";
import useLogin from "../../hooks/data/login-hook";

const SignInPage = () => {
  const { loginUser, isLoading } = useLogin();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkBoxItems, setCheckBoxItems] = useState([]);

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
    setEmailError("");
  };
  
  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
    setPasswordError("");
  };
  
  const handleEmailBlur = () => {
    if (emailInput === "") {
      setEmailError("Email is required.");
    }
  };
  
  const handlePasswordBlur = () => {
    if (passwordInput === "") {
      setPasswordError("Password is required.");
    }
  };
  
  const checkBoxHandler = (items) => {
    setCheckBoxItems(items);
  };

  useEffect(() => {
    checkBoxHandler;
    console.log(checkBoxItems);
  }, [checkBoxItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (emailInput === "") {
      setEmailError("Email is required.");
    }

    if (passwordInput === "") {
      setPasswordError("Password is required.");
    }

    if (emailInput !== "" && passwordInput !== "") {
    }
    
    try { 
      const res = await loginUser({email: emailInput, password: passwordInput }) 
      console.log(res);
    } catch (error)
    {console.log(error)};
  };

  return (
    <form className={`${styles["main-container"]} `} onSubmit={handleSubmit}>
      <div>
        <div className="logo">
          <img src={Logo} alt="Cushy Rental Icon" />{" "}
        </div>

        <div className={`${styles["component-title"]} `}>
          <h2>Sign In to</h2>
          <h2>Cushy Rental</h2>
        </div>
      </div>

      <div className={`${styles["sign-in"]} `}>
        <div className={`${styles["custom__inputs"]} `}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={emailInput}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <p className={styles["error"]}>{emailError}</p>
        </div>

        <div className={`${styles["custom__inputs"]} `}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={passwordInput}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <div className={styles["error"]}>{passwordError}</div>
        </div>

        <div className={`${styles["remember-forgot"]} `}>
          <div className={`${styles["remember-me"]} `}>
            <CheckBox
              items={[{ id: 1, name: "Remember Me" }]}
              onCheckBox={checkBoxHandler}
            />
          </div>
          <div className={`${styles["remember-me"]} `}>
            <Link
              to="/SignInPage/ForgotPassword"
              className={`${styles["forgot-password"]} `}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <PrimaryButton type="submit" isLoading={isLoading}>LOG IN</PrimaryButton>

        <div>
          <div className={`${styles["sign-up__container"]}`}>
            <div className={styles.hr}></div>
            <div className={styles.option}>Or Sign Up with</div>
            <div className={styles.hr}></div>
          </div>

          <div className={styles.socmed}>
            <Link>
              <div className={styles["background"]}>
                <FacebookOutlinedIcon
                  size="large"
                  style={{ color: "#4267B2" }}
                />{" "}
                Facebook
              </div>
            </Link>
            <Link>
              <div className={styles["background"]}>
                <img
                  src={Google}
                  alt="Google Icon"
                  className={styles.googleIcon}
                />{" "}
                Google
              </div>
            </Link>
          </div>
        </div>

        <div className={`${styles["login-option"]}`}>
          <span>Don't have an account? </span>
          <span className={`${styles["signup-link"]}`}>
            <Link to="/register" className={`${styles["signup-word"]}`}>
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignInPage;
