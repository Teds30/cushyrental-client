import { useContext } from "react";
import { Link } from "react-router-dom";

import TextField from "../../../../components/TextField/TextField";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import CreateUnitContext from "../../../../context/create-unit-context";
import useValidate from "../../../../hooks/validate-input-hook";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";
import BorderlessButton from "../../../../components/Button/BorderlessButton";

const LocationForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext);
    const locationDetails = createUnitCtx.unitData;

    const { onNext, onBack } = props;

    const {
        value: enteredLocation,
        isValid: enteredLocationIsValid,
        hasError: enteredLocationHasError,
        valueChangeHandler: locationChangeHandler,
        inputBlurHandler: locationBlurHandler,
        reset: titleReset,
    } = useValidate((value) => value.trim() !== "");

    let formIsValid = false;

    if (enteredLocationIsValid) {
        formIsValid = true;
    }

    const draftPricing = () => {
        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                location: enteredLocation,
            });
        } else if (locationDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                location: createUnitCtx.unitData.location,
            });
        }
    };

    const backHandler = (event) => {
        event.preventDefault();

        draftPricing();

        onBack();
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                location: enteredLocation
            });
        } else if (locationDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                location: createUnitCtx.unitData.location,
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
            <div className="title">Basic Details</div>

            <div className={`${styles['location-form-container']}`}>
            <TextField
                fullWidth
                label="Location"
                defaultValue={!enteredLocation ? locationDetails.location : enteredLocation}
                onChange={locationChangeHandler}
                onBlur={locationBlurHandler}
                required
            />
            <Link to='/manage_unit/create_unit/location' style={{padding: '0 5px', color: 'var(--accent)'}}>Change</Link>
            </div>

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    );
};

export default LocationForm;
