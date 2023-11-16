import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/Button/PrimaryButton";
import useUserManager from "../../../hooks/data/users-hook";
import useNotistack from "../../../hooks/notistack-hook";
import AuthContext from "../../../context/auth-context";

import styles from "../../Login/SignInPage.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ChangeContactNumberOtp = (props) => {
    const { user, token } = props;
    const { updateUser, isLoading } = useUserManager();
    const navigate = useNavigate();
    const { notify } = useNotistack();
    const userCtx = useContext(AuthContext);

    const [otpDigits, setOtpDigits] = useState(Array(5).fill(""));
    const [showInfo, setShowInfo] = useState(false);
    const [otp, setOtp] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);
    const [time, setTime] = useState(60);

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
        setShowInfo(!showInfo);
    };

    const generateRandomNumbers = () => {
        const newRandomNumbers = [];
        for (let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
            newRandomNumbers.push(randomNumber);
        }
        return newRandomNumbers;
    };

    const resendHandler = () => {
        setError(false);
        setOtpDigits(Array(5).fill(""));
        setTime(60);
    };

    const submitHandler = async () => {
        if (otpDigits.length !== 5) {
            console.log("Hello John");
            return;
        }

        setError(false);

        const otpCode = otpDigits.map(Number);

        const isEqual = JSON.stringify(otpCode) === JSON.stringify(otp);

        if (isEqual) {
            // onVerified();
            console.log(isEqual);
            try {
                const res = await updateUser(
                    { ...user, gender: user.gender.toString() },
                    user.id
                );
                console.log(res);
                userCtx.onLogin({ user: res, token: token });
                navigate("/profile/user_profile");
                notify("Successfully update phone number.", "success");
            } catch (err) {}
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        let interval;

        if (time === 60) {
            const returnOtp = generateRandomNumbers();
            console.log(returnOtp);
            console.log(token);
            setOtp(returnOtp);
            // send verify code here
        }

        if (time !== 0) {
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
                Enter Code
                <AiOutlineInfoCircle size={20} onClick={toggleInfo} />
            </div>

            {showInfo && (
                <div
                    className={`${styles["overlay-bubble"]} ${styles["show"]}`}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, hic.
                </div>
            )}

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

export default ChangeContactNumberOtp;
