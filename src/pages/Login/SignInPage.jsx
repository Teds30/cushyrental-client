import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextField from "../../components/TextField/TextField";
import CheckBox from "../../components/CheckBox/CheckBox";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Google from "../../assets/google.svg";
import Logo from "../../assets/cushyrental.svg";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ checkBoxItems, setCheckBoxItems ] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkBoxHandler = (items) => {
    setCheckBoxItems(items);
  };

  useEffect(() => {
    checkBoxHandler;
    console.log(checkBoxItems);
  }, [checkBoxItems]);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={`${styles["main-content"]} `} onSubmit={handleSubmit}>
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
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className={`${styles["custom__inputs"]} `}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className={`${styles["remember-forgot"]} `}>
          <div className={`${styles["remember-me"]} `}>
            <CheckBox items={[{ id: 1, name: "Remember Me" }]} onCheckBox={checkBoxHandler}/>
          </div>
          <div className={`${styles["remember-me"]} `}>
            <Link to="/SignInPage/ForgotPassword" className={`${styles["forgot-password"]} `}>Forgot Password?</Link>
          </div>
        </div>

        <PrimaryButton type="submit">LOG IN</PrimaryButton>

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
            <Link to="/register" className={`${styles["signup-word"]}`}>Sign Up</Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignInPage;
