import TextField from "../../../components/TextField/TextField";
import useValidate from "../../../hooks/validate-input-hook";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import useUserManager from "../../../hooks/data/users-hook";
import useNotistack from "../../../hooks/notistack-hook";

import styles from "./ChangeContactNumber.module.css";

const ChangeContactNumber = (props) => {
    const { onNumber, onReset } = props;
    const { notify } = useNotistack();

    const {
        value: enteredNumber,
        isValid: enteredNumberIsValid,
        hasError: enteredNumberHasError,
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
        reset: numberReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.includes("09") || value.includes("+63") && value.length === 11 || value.length === 13
        // && value.includes(".com")
    );

    let formIsValid = false;

    if (enteredNumberIsValid) {
        formIsValid = true;
    }

    const submitHandler = () => {
        if (!formIsValid) {
            return;
        }

        onNumber(enteredNumber);
    };

    return (
        <div className={`${styles["change-number-row"]}`}>
            <div className={`${styles["enter-number"]} `}>
                <p>Insert your new contact number.</p>
                <TextField
                    fullWidth
                    label="Contact Number"
                    type="text"
                    value={enteredNumber}
                    onChange={numberChangeHandler}
                    onBlur={numberBlurHandler}
                    helperText={
                        enteredNumberHasError && "Please enter your cellular number."
                    }
                    error
                />
            </div>

            <PrimaryButton
                width="100%"
                onClick={submitHandler}
                // isLoading={isLoading}
                // loadingText="SUBMIT"
            >
                SUBMIT
            </PrimaryButton>
        </div>
    );
};

export default ChangeContactNumber;
