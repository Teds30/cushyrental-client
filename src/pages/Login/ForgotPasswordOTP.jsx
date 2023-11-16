import React, { useState } from "react";
import styles from "./SignInPage.module.css";

const ForgotPasswordOTP = ({ otp, setIsVerified }) => {
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));

    const [error, setError] = useState(false);
    const [otpEntered, setOtpEntered] = useState(false);

    const otpDigitChangeHandler = (index, value) => {
        const updatedOtpDigits = [...otpDigits];
        updatedOtpDigits[index] = value;

        if (
            otp.join("") != updatedOtpDigits.join("") &&
            updatedOtpDigits.length != 6
        ) {
            setIsVerified(false);
            setError(true);
        } else if (
            otp.join("") === updatedOtpDigits.join("") &&
            updatedOtpDigits.length === 6
        ) {
            setIsVerified(true);
            setError(false);
            setOtpEntered(true);
        }

        setOtpDigits(updatedOtpDigits);
    };

    return (
        <div className={styles["otp"]}>
            {otpDigits.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className={`${styles["otp-input"]} ${
                        error && styles.error
                    }`}
                    value={digit}
                    onChange={(e) =>
                        otpDigitChangeHandler(index, e.target.value)
                    }
                />
            ))}
        </div>
    );
};

export default ForgotPasswordOTP;
