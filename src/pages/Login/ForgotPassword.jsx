import React, { useEffect, useState, Fragment } from "react";
import styles from "../Login/SignInPage.module.css";
import PrimaryButton from "../../components/Button/PrimaryButton";
import useSendEmail from "./send-email-hook";
import useLogin from "../../hooks/data/login-hook";
import ForgotPasswordInfo from "./ForgotPasswordInfo";

import { AiOutlineInfoCircle } from "react-icons/ai";

const ForgotPassword = (props) => {
    const { email, onVerified } = props;
    const { sendOtp } = useSendEmail();
    const { forgotPassword, isLoading } = useLogin();

    const [otpDigits, setOtpDigits] = useState(Array(5).fill(""));
    const [otp, setOtp] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);
    const [time, setTime] = useState(60);
    const [isHasTime, SetItHasTime] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const otpDigitChangeHandler = (index, value) => {
        const updatedOtpDigits = [...otpDigits];
        updatedOtpDigits[index] = value;

        if (
            otp.join("") != updatedOtpDigits.join("") &&
            updatedOtpDigits.length != 5
        ) {
            setIsVerified(false);
            setError(true);
            setError(true);
        } else if (
            otp.join("") === updatedOtpDigits.join("") &&
            updatedOtpDigits.length === 5
        ) {
            setIsVerified(true);
            setError(false);
        }

        setOtpDigits(updatedOtpDigits);
    };

    const toggleInfo = () => {
        setDialogOpen(true);
        console.log("clicked!");
    };

    const generateRandomNumbers = () => {
        const newRandomNumbers = [];
        for (let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 10); 
            newRandomNumbers.push(randomNumber);
        }
        return newRandomNumbers;
    };

    const resendHandler = () => {
        setError(false);
        setOtpDigits(Array(5).fill(""));
        setTime(60);
    };

    const submitHandler = () => {
        if (otpDigits.length !== 5) {
            return;
        }

        setError(false);

        const otpCode = otpDigits.map(Number);

        const isEqual = JSON.stringify(otpCode) === JSON.stringify(otp);

        if (isEqual) {
            onVerified();
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        let interval;

        if (time === 60) {
            const returnOtp = generateRandomNumbers();
            setOtp(returnOtp);
            sendOtp(email, returnOtp);
        }

        if (time !== 0) {
            // if ()

            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            setOtp([]);
        }

        return () => clearInterval(interval);
    }, [time, setTime]);

    return (
        <div className={`${styles["forgot-password-code-row"]}`}>
            <div className={`${styles["enter-code"]} `}>
                <p>Enter Code</p>
                <AiOutlineInfoCircle size={20} onClick={toggleInfo} />
            </div>

            <ForgotPasswordInfo
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />

            <div className={`${styles["otp-main"]}`}>
                <div className={`${styles["otp-row"]}`}>
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

                    <div
                        className={`${styles["resend-button"]} ${
                            time !== 0 && styles["has-time"]
                        }`}
                    >
                        <button
                            disabled={time !== 0 ? true : false}
                            onClick={resendHandler}
                        >
                            {time === 0
                                ? "Resend"
                                : "Resend in " + "(" + time + "s)"}
                        </button>
                    </div>
                </div>

                <PrimaryButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="SUBMIT"
                    width="100%"
                    onClick={submitHandler}
                >
                    SUBMIT
                </PrimaryButton>
            </div>
        </div>
    );
};

export default ForgotPassword;
