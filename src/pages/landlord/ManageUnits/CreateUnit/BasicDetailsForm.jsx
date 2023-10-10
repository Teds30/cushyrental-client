import { useContext } from "react";

import TextField from "../../../../components/TextField/TextField";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import CreateUnitContext from "../../../../context/create-unit-context";
import useValidate from "../../../../hooks/validate-input-hook";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const BasicDetailsForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext);
    const unitDetails = createUnitCtx.unitData;

    const { onNext } = props;

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useValidate((value) => value.trim() !== "");
    const {
        value: enteredDetails,
        isValid: enteredDetailsIsValid,
        hasError: enteredDetailsHasError,
        valueChangeHandler: detailsChangeHandler,
        inputBlurHandler: detailsBlurHandler,
        reset: detailsReset,
    } = useValidate((value) => value.trim() !== "");

    let formIsValid = false;

    if (enteredNameIsValid && enteredDetailsIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                name: enteredName,
                details: enteredDetails,
            });
        } else if (unitDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                name: enteredNameIsValid ? enteredName : unitDetails.name,
                details: enteredDetailsIsValid
                    ? enteredDetails
                    : unitDetails.details,
            });
        } else {
            return;
        }

        onNext();
    };

    return (
        <form
            className={`${styles["basic-details-form"]}`}
            onSubmit={submitHandler}
        >
            <div className={`${styles.title}`}>Basic Details</div>

            <TextField
                fullWidth
                label="Title"
                defaultValue={!enteredName ? unitDetails.name : enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                required
            />

            <TextField
                fullWidth
                label="Details"
                rows={4}
                multiline
                defaultValue={
                    !enteredDetails ? unitDetails.details : enteredDetails
                }
                onChange={detailsChangeHandler}
                onBlur={detailsBlurHandler}
                required
            />

            <div className={`${styles["basic-details-button"]}`}>
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    );
};

export default BasicDetailsForm;
