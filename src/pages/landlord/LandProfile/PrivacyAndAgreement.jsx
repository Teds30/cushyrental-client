import CardShadow from "../../../components/Card/CardShadow";
import TextField from "../../../components/TextField/TextField";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CheckBox from "../../../components/CheckBox/CheckBox";
import useVerificationManager from "../../../hooks/data/verifications-hook";
import VerifyAccountContext from "../../../context/verify-account-context";
import AuthContext from "../../../context/auth-context";

import styles from "./AccountVerification.module.css";
import { useContext, useState } from "react";

const PrivacyAndAgreement = (props) => {
    const { onNext } = props;
    const { accountVerification, isLoading } = useVerificationManager();
    const verifyCtx = useContext(VerifyAccountContext);
    const userCtx = useContext(AuthContext);

    const [selected, setSelected] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();

        if (selected.length === 0) {
            return;
        }

        const data = {
            ...verifyCtx.userAccount,
            user_id: userCtx.user.id,
        };

        console.log(data);

        try {
            const res = await accountVerification(data);
            onNext();
        } catch (err) {}

        
    };

    return (
        <div className={`${styles["personal-information-section"]}`}>
            <p
                className="smaller-text"
                style={{
                    color: "var(--fc-body-light)",
                    textAlign: "center",
                    padding: "0 30px",
                }}
            >
                Do you agree to the terms in protecting users and privacy?
            </p>

            <form
                onSubmit={submitHandler}
                className={`${styles["personal-information-section-form"]}`}
            >
                <div className={`${styles["personal-information-row"]}`}>
                    <CardShadow>
                        <p className="title" style={{ marginBottom: "12px" }}>
                            Privacy and Agreement
                        </p>

                        <div
                            className={`${styles["privacy-information-form"]}`}
                        >
                            <div
                                className={`${styles["privacy-and-agreement"]}`}
                            >
                                <p>
                                    As we guarantee the safety of our users'
                                    privacy, the provided information will not
                                    be used for any unrelated purposes or shared
                                    with any third party without the user's
                                    explicit consent. We ensure that the
                                    information is always kept secure and
                                    confidential. Thus, your uploaded document
                                    will be permanently deleted in our system
                                    after the administrators verified your
                                    account.
                                </p>

                                <p>
                                    As we guarantee the safety of our users'
                                    privacy, the provided information will not
                                    be used for any unrelated purposes or shared
                                    with any third party without the user's
                                    explicit consent. We ensure that the
                                    information is always kept secure and
                                    confidential. Thus, your uploaded document
                                    will be permanently deleted in our system
                                    after the administrators verified your
                                    account.
                                </p>
                            </div>

                            <div className={styles["hr"]}></div>

                            <p
                                className="smaller-text"
                                style={{ textAlign: "justify" }}
                            >
                                By clicking this, you agree to the privacy and
                                agreement in verifying your account.
                            </p>

                            <div className={`${styles["approve"]}`}>
                                <CheckBox
                                    items={[{ id: 1, name: "" }]}
                                    selectedValue={selected}
                                    onSelectedUsers={setSelected}
                                />
                                <p className="smaller-text">Yes, I agree</p>
                            </div>
                        </div>
                    </CardShadow>
                </div>

                <PrimaryButton isLoading={isLoading} loadingText="Saving">
                    Save
                </PrimaryButton>
            </form>
        </div>
    );
};

export default PrivacyAndAgreement;
