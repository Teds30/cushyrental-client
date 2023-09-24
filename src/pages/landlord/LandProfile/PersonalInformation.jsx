import CardShadow from "../../../components/Card/CardShadow";
import TextField from "../../../components/TextField/TextField";
import PrimaryButton from "../../../components/Button/PrimaryButton";

import styles from "./AccountVerification.module.css";

const PersonalInformation = (props) => {
    const { onNext } = props

    const submitHandler = (event) => {
        event.preventDefault();
        
        onNext();
    }

    return (
        <div className={`${styles["personal-information-section"]}`}>
            <p
                className="smaller-text"
                style={{ color: "var(--fc-body-light)", textAlign: "center" }}
            >
                Provide the needed details of your information.
            </p>

            <form onSubmit={submitHandler} className={`${styles['personal-information-section-form']}`}>
                <div className={`${styles["personal-information-row"]}`}>
                    <CardShadow>
                        <p className="title" style={{ marginBottom: "12px" }}>
                            Name
                        </p>

                        <div
                            className={`${styles["personal-information-form"]}`}
                        >
                            <TextField fullWidth label="Last Name" />

                            <TextField fullWidth label="Middle Name" />

                            <TextField fullWidth label="Last Name" />
                        </div>
                    </CardShadow>

                    <CardShadow>
                        <p className="title" style={{ marginBottom: "12px" }}>
                            Address
                        </p>

                        <div
                            className={`${styles["personal-information-form"]}`}
                        >
                            <TextField fullWidth label="House Number" />

                            <TextField fullWidth label="Street" />

                            <TextField fullWidth label="Barangay" />

                            <TextField fullWidth label="Municipality/City" />

                            <TextField fullWidth label="Province" />
                        </div>
                    </CardShadow>
                </div>

                <PrimaryButton>Save</PrimaryButton>
            </form>
        </div>
    );
};

export default PersonalInformation;
