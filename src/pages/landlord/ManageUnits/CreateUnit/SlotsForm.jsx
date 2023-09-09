import { useContext } from "react";

import TextField from "../../../../components/TextField/TextField";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import CreateUnitContext from "../../../../context/create-unit-context";
import useValidate from "../../../../hooks/validate-input-hook";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const SlotsForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext);
    const slotDetails = createUnitCtx.unitData;

    const { onNext, onBack } = props;

    const {
        value: enteredTotalSlots,
        isValid: enteredTotalSlotsIsValid,
        hasError: enteredTotalSlotsHasError,
        valueChangeHandler: totalSlotsChangeHandler,
        inputBlurHandler: totalSlotsBlurHandler,
        reset: totalSlotsReset,
    } = useValidate((value) => value.trim() !== "");
    const {
        value: enteredAvailableSlots,
        isValid: enteredAvailableSlotsIsValid,
        hasError: enteredAvailableSlotsHasError,
        valueChangeHandler: availableSlotsChangeHandler,
        inputBlurHandler: availableSlotsBlurHandler,
        reset: AvailableSlotsReset,
    } = useValidate((value) => value.trim() !== "");

    let formIsValid = false;

    if (enteredTotalSlotsIsValid && enteredAvailableSlotsIsValid) {
        formIsValid = true;
    }

    const draftSlots = () => {
        // may kulang pa
        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                total_slots: enteredTotalSlots,
                available_slots: enteredAvailableSlots,
            });
        } else if (slotDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                total_slots: enteredTotalSlotsIsValid
                    ? enteredTotalSlots
                    : slotDetails.total_slots,
                available_slots: enteredAvailableSlotsIsValid
                    ? enteredAvailableSlots
                    : slotDetails.available_slots,
            });
        }
    };

    const backHandler = (event) => {
        event.preventDefault();

        draftSlots();

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                total_slots: enteredTotalSlots,
                available_slots: enteredAvailableSlots,
            });
        } else if (slotDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                total_slots: enteredTotalSlotsIsValid
                    ? enteredTotalSlots
                    : slotDetails.total_slots,
                available_slots: enteredAvailableSlotsIsValid
                    ? enteredAvailableSlots
                    : slotDetails.available_slots,
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
            <div className={`${styles.title}`}>How many tenants can stay in the unit?</div>

            <TextField
                fullWidth
                label="Total Slots"
                type="number"
                defaultValue={
                    !enteredTotalSlots
                        ? slotDetails.total_slots
                        : enteredTotalSlots
                }
                onChange={totalSlotsChangeHandler}
                onBlur={totalSlotsBlurHandler}
                required
            />

            <TextField
                fullWidth
                label="Available Slots"
                type="number"
                defaultValue={
                    !enteredAvailableSlots
                        ? slotDetails.available_slots
                        : enteredAvailableSlots
                }
                onChange={availableSlotsChangeHandler}
                onBlur={availableSlotsBlurHandler}
                required
            />

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    );
};

export default SlotsForm;
