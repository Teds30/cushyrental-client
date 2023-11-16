import React from "react";

const ForgotPasswordInput = () => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);

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

    if (enteredNewPasswordIsValid && confirmPassword === enteredNewPassword) {
        formIsValid = true;
    }

    if (enteredNewPasswordIsValid) {
        formIsValid = true;
    }

    return (
        <div>
            <div>
                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    disabled={!isVerified === true && true}
                    value={enteredNewPassword}
                    onChange={newPasswordChangeHandler}
                    onBlur={newPasswordBlurHandler}
                    helperText={
                        enteredNewPasswordHasError &&
                        "Password must contain 8+ characters, symbol, upper and lowercase letters and a number."
                    }
                    error
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    label="Re-type New Password"
                    type="password"
                    disabled={!isVerified === true && true}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => {
                        if (confirmPassword === enteredNewPassword) {
                            setConfirmPasswordIsValid(true);
                        } else {
                            setConfirmPasswordIsValid(false);
                        }
                    }}
                    helperText={
                        !confirmPasswordIsValid && "Passwords do not match."
                    }
                    error
                />
            </div>

            <PrimaryButton
                type="submit"
                disabled={!formIsValid}
                isLoading={isLoading}
                loadingText="SUBMIT"
            >
                Change Password
            </PrimaryButton>
        </div>
    );
};

export default ForgotPasswordInput;
