import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextField from "../../components/TextField/TextField";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ForgotPassword = () => {
  const [otpDigits, setOtpDigits] = useState(Array(4).fill(""));
  const [showInfo, setShowInfo] = useState(false);

  const otpDigitChangeHandler = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <form className={`${styles["main-container"]} `}>
      <Link to={`/SignInPage`}>
        <div className={styles["back"]}>
          <FiChevronLeft size={24} /> FORGOT PASSWORD
        </div>
      </Link>

      <div>
        <TextField fullWidth label="Email Address" type="email" />
      </div>

      <div className={`${styles["enter-code"]} `}>
        Enter Code
        <AiOutlineInfoCircle size={20} onClick={toggleInfo} />
      </div>

      {showInfo && (
        <div className={`${styles["overlay-bubble"]} ${styles["show"]}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, hic.
        </div>
      )}

      <div className={styles["otp"]}>
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
