import { useContext, useState } from "react";

import CardShadow from "../../../components/Card/CardShadow";
import TextField from "../../../components/TextField/TextField";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import AuthContext from "../../../context/auth-context";
import useValidate from "../../../hooks/validate-input-hook";
import VerifyAccountContext from "../../../context/verify-account-context";

import styles from "./AccountVerification.module.css";

const PersonalInformation = (props) => {
    const { onNext } = props;
    const userCtx = useContext(AuthContext);
    const verifyCtx = useContext(VerifyAccountContext);

    const {
        value: enteredHouseNumber,
        isValid: enteredHouseNumberIsValid,
        hasError: enteredHouseNumberHasError,
        valueChangeHandler: houseNumberChangeHandler,
        inputBlurHandler: houseNumberBlurHandler,
        reset: houseNumberReset,
    } = useValidate((value) => value.trim() !== "");

    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: enteredStreetHasError,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        reset: streetReset,
    } = useValidate((value) => value.trim() !== "");

    const {
        value: enteredBarangay,
        isValid: enteredBarangayIsValid,
        hasError: enteredBarangayHasError,
        valueChangeHandler: barangayChangeHandler,
        inputBlurHandler: barangayBlurHandler,
        reset: barangayReset,
    } = useValidate((value) => value.trim() !== "");

    const {
        value: enteredMunicipality,
        isValid: enteredMunicipalityIsValid,
        hasError: enteredMunicipalityHasError,
        valueChangeHandler: municipalityChangeHandler,
        inputBlurHandler: municipalityBlurHandler,
        reset: municipalityReset,
    } = useValidate((value) => value.trim() !== "");

    const {
        value: enteredProvince,
        isValid: enteredProvinceIsValid,
        hasError: enteredProvinceHasError,
        valueChangeHandler: provinceChangeHandler,
        inputBlurHandler: provinceBlurHandler,
        reset: provinceReset,
    } = useValidate((value) => value.trim() !== "");

    const [isSaving, setIsSaving] = useState(false);

    let formIsValid = false;

    if (
        enteredHouseNumberIsValid &&
        enteredStreetIsValid &&
        enteredBarangayIsValid &&
        enteredMunicipalityIsValid &&
        enteredProvinceIsValid
    ) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        setIsSaving(true);

        const data = {
            address: `${enteredHouseNumber}, ${enteredStreet}, ${enteredBarangay}, ${enteredMunicipality}, ${enteredProvince}`,
            contact_number: userCtx.user.phone_number,
        };

        verifyCtx.onVerify(data);

        onNext();
    };

    return (
        <div className={`${styles["personal-information-section"]}`}>
            <p
                className="smaller-text"
                style={{ color: "var(--fc-body-light)", textAlign: "center" }}
            >
                Provide the needed details of your information.
            </p>

            <form
                onSubmit={submitHandler}
                className={`${styles["personal-information-section-form"]}`}
            >
                <div className={`${styles["personal-information-row"]}`}>
                    <CardShadow>
                        <p className="title" style={{ marginBottom: "12px" }}>
                            Name
                        </p>

                        <div
                            className={`${styles["personal-information-form"]}`}
                        >
                            <TextField
                                fullWidth
                                label="Last Name"
                                defaultValue={userCtx.user.first_name}
                                disabled
                            />

                            <TextField
                                fullWidth
                                label="Middle Name"
                                defaultValue={userCtx.user.middle_name}
                                disabled
                            />

                            <TextField
                                fullWidth
                                label="Last Name"
                                defaultValue={userCtx.user.last_name}
                                disabled
                            />
                        </div>
                    </CardShadow>

                    <CardShadow>
                        <p className="title" style={{ marginBottom: "12px" }}>
                            Address
                        </p>

                        <div
                            className={`${styles["personal-information-form"]}`}
                        >
                            <TextField
                                fullWidth
                                label="House Number"
                                value={enteredHouseNumber}
                                onChange={houseNumberChangeHandler}
                                onBlur={houseNumberBlurHandler}
                                helperText={
                                    enteredHouseNumberHasError &&
                                    "Please enter your house number."
                                }
                                error
                            />

                            <TextField
                                fullWidth
                                label="Street"
                                value={enteredStreet}
                                onChange={streetChangeHandler}
                                onBlur={streetBlurHandler}
                                helperText={
                                    enteredStreetHasError &&
                                    "Please enter your house number."
                                }
                                error
                            />

                            <TextField
                                fullWidth
                                label="Barangay"
                                value={enteredBarangay}
                                onChange={barangayChangeHandler}
                                onBlur={barangayBlurHandler}
                                helperText={
                                    enteredBarangayHasError &&
                                    "Please enter your house number."
                                }
                                error
                            />

                            <TextField
                                fullWidth
                                label="Municipality/City"
                                value={enteredMunicipality}
                                onChange={municipalityChangeHandler}
                                onBlur={municipalityBlurHandler}
                                helperText={
                                    enteredMunicipalityHasError &&
                                    "Please enter your house number."
                                }
                                error
                            />

                            <TextField
                                fullWidth
                                label="Province"
                                value={enteredProvince}
                                onChange={provinceChangeHandler}
                                onBlur={provinceBlurHandler}
                                helperText={
                                    enteredProvinceHasError &&
                                    "Please enter your house number."
                                }
                                error
                            />
                        </div>
                    </CardShadow>
                </div>

                <PrimaryButton isLoading={isSaving} loadingText="Saving">
                    Save
                </PrimaryButton>
            </form>
        </div>
    );
};

export default PersonalInformation;
