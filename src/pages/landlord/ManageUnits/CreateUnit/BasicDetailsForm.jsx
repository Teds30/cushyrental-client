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
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: enteredTitleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
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

    if (enteredTitleIsValid && enteredDetailsIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                title: enteredTitle,
                details: enteredDetails,
            });
        } else if (unitDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                title: enteredTitleIsValid
                    ? enteredTitle
                    : unitDetails.title,
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
                defaultValue={!enteredTitle ? unitDetails.title : enteredTitle}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
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
