import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNotistack from "../../hooks/notistack-hook";

import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextField from "../../components/TextField/TextField";
import useValidate from "../../hooks/validate-input-hook";
import useSendEmail from "./send-email-hook";
import useLogin from "../../hooks/data/login-hook";

import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ForgotPassword = () => {
  const { sendOtp } = useSendEmail();
  const { forgotPassword, isLoading } = useLogin();
  const { notify } = useNotistack();

  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useValidate(
    (value) =>
      value.trim() !== "" && value.includes("@") && value.includes(".com")
  );
  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: enteredNewPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: newPasswordReset,
  } = useValidate(
    (value) => value.trim() !== "" && value.length >= 8 && regex.test(value)
  );
  let formIsValid = false

  const [otpDigits, setOtpDigits] = useState(Array(4).fill(""));
  const [showInfo, setShowInfo] = useState(false);
  const [otp, setOtp] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [ error, setError ] = useState(false);

  if (enteredNewPasswordIsValid) {
    formIsValid = true;
  }

  const otpDigitChangeHandler = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;

    if (otp.join("") != updatedOtpDigits.join("") && updatedOtpDigits.length != 4) {
      setIsVerified(false);
      setError(true);
      setError(true);
    } else if (otp.join("") === updatedOtpDigits.join("") && updatedOtpDigits.length === 4) {
      setIsVerified(true);
      setError(false);
    }

    setOtpDigits(updatedOtpDigits);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const generateRandomNumbers = () => {
    const newRandomNumbers = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
      newRandomNumbers.push(randomNumber);
    }
    return newRandomNumbers;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = {
      email: enteredEmail,
      password: enteredNewPassword
    }

    console.log(data);

    try {
      const res = await forgotPassword(data);
      if (res) {
        notify('Update password successfullly', 'success');
      }
    } catch (error) {
      console.log(error);
    }

    emailReset();
    setOtpDigits('');
    newPasswordReset('');
  };

  useEffect(() => {
    if (enteredEmailIsValid && !enteredEmailHasError) {
      const returnOtp = generateRandomNumbers();
      setOtp(returnOtp);
      sendOtp(enteredEmail, returnOtp);
    }
  }, [enteredEmailIsValid, enteredEmailHasError]);

  return (
    <form className={`${styles["main-container"]} `} onSubmit={submitHandler}>
      <div>
        <Link to={`/signin`}>
          <div className={styles["back"]}>
            <FiChevronLeft size={24} /> FORGOT PASSWORD
          </div>
        </Link>
      </div>

      <div>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          helperText={enteredEmailHasError && "Please enter your valid email."}
          error
        />
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
            className={`${styles["otp-input"]} ${error && styles.error}`}
            value={digit}
            onChange={(e) => otpDigitChangeHandler(index, e.target.value)}
          />
        ))}
      </div>

      <div>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          disabled={!isVerified === true && true}
          value={enteredNewPassword}
          onChange={newPasswordChangeHandler}
          onBlur={newPasswordBlurHandler}
          helperText={enteredNewPasswordHasError && "Password must contain 8+ characters, symbol, upper and lowercase letters and a number."}
          error
        />
      </div>

      <PrimaryButton type="submit" disabled={!formIsValid} isLoading={isLoading}
          loadingText="SUBMIT">
        SUBMIT
      </PrimaryButton>
    </form>
  );
};

export default ForgotPassword;
