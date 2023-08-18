import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextField from "../../components/TextField/TextField";
import { FiChevronLeft } from "react-icons/fi";

const ForgotPassword = () => {
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));

  const otpDigitChangeHandler = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);
  };

  return (
    <form className={`${styles["main-content"]} `}>
      <Link to={`/SignInPage`}>
        <div className={styles["back"]}>
          <FiChevronLeft size={24} /> FORGOT PASSWORD
        </div>
      </Link>

      <div>
        <TextField fullWidth label="Email Address" type="email" />
      </div>

      <div>
        <h3>Enter Code</h3>
      </div>

      <div className="otp">
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className={`${styles["otp-input"]} `}
            value={digit}
            onChange={(e) => otpDigitChangeHandler(index, e.target.value)}
          />
        ))}
      </div>

      <div>
        <TextField fullWidth label="New Password" type="password" />
      </div>

      <PrimaryButton type="submit">SUBMIT</PrimaryButton>
    </form>
  );
};

export default ForgotPassword;
