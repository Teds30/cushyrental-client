import TextField from "../../../components/TextField/TextField";
import useValidate from "../../../hooks/validate-input-hook";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import useUserManager from "../../../hooks/data/users-hook";
import useNotistack from "../../../hooks/notistack-hook";
import TextFieldAdornedPassword from "../../../components/TextFieldAdorned/TextFieldAdornedPassword";
import useLogin from "../../../hooks/data/login-hook";

import styles from "./ChangeContactNumber.module.css";

const ChangeContactNumberPassword = (props) => {
    const { email, onAuthenticatedUser } = props;
    const { notify } = useNotistack();
    const { loginUser, isLoading } = useLogin();

    console.log(email);

    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.length >= 8 && regex.test(value)
        // && value.includes(".com")
    );

    let formIsValid = false;

    if (enteredPasswordIsValid) {
        formIsValid = true;
    }

    const submitHandler = async () => {
        if (!formIsValid) {
            return;
        }

        try {
            const res = await loginUser({
                email: email,
                password: enteredPassword,
            });

            console.log(res);
            onAuthenticatedUser();
            if (res.user === null) {
                notify('Incorrect password', 'error')
            }
        } catch(err) {}

        // onNumber(enteredNumber);
    };

    return (
        <div className={`${styles["change-number-row"]}`}>
            <div className={`${styles["enter-number"]} `}>
                <TextFieldAdornedPassword
                    label="Password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    helperText={
                        enteredPasswordHasError &&
                        "Password must contain 8+ characters, symbol, upper and lowercase letters and a number."
                    }
                />
            </div>

            <PrimaryButton
                width="100%"
                onClick={submitHandler}
                isLoading={isLoading}
                loadingText="SUBMIT"
            >
                SUBMIT
            </PrimaryButton>
        </div>
    );
};

export default ChangeContactNumberPassword;

// ChangeContactNumberPassword
