import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../../components/TextField/TextField";
import PrimaryButton from "../../components/Button/PrimaryButton";
import useValidate from "../../hooks/validate-input-hook";
import useLogin from "../../hooks/data/login-hook";
import TextFieldAdornedPassword from "../../components/TextFieldAdorned/TextFieldAdornedPassword";
import AuthContext from "../../context/auth-context";
import useNotistack from "../../hooks/notistack-hook";

import styles from "./ForgotPassword.module.css";

const ForgotPasswordUpdatePassword = (props) => {
    const { user } = props;
    const { forgotPassword, isLoading } = useLogin();
    const userCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
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

    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmPasswordIsValid,
        hasError: enteredConfirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: confirmPasswordReset,
    } = useValidate((value) => enteredNewPassword === value);

    let formIsValid = false;

    if (enteredNewPasswordIsValid && enteredConfirmPasswordIsValid) {
        formIsValid = true;
    }

    const updatePasswordHandler = async () => {
        if (!formIsValid) {
            return;
        }

        try {
            const res = await forgotPassword({
                email: user.email,
                password: enteredNewPassword,
            });
            if (res) {
                userCtx.onLogin({ user: res.user, token: res.token });
                navigate("/");
                notify("Update password successfullly", "success");
            }
        } catch (error) {
        }
    };

    return (
        <div className={`${styles["forgot-password-update-row"]}`}>
            <TextFieldAdornedPassword
                label="New Password"
                value={enteredNewPassword}
                onChange={newPasswordChangeHandler}
                onBlur={newPasswordBlurHandler}
                helperText={
                    enteredNewPasswordHasError &&
                    "Please confirm your password."
                }
            />

            <TextFieldAdornedPassword
                label="Re-type new password"
                value={enteredConfirmPassword}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                helperText={
                    enteredConfirmPasswordHasError &&
                    "Please confirm your password."
                }
            />

            <PrimaryButton
                width="100%"
                isLoading={isLoading}
                loadingText="SUBMIT"
                onClick={updatePasswordHandler}
            >
                SUBMIT
            </PrimaryButton>
        </div>
    );
};

export default ForgotPasswordUpdatePassword;
