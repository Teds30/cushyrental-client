import CardShadow from "../../../components/Card/CardShadow";
import TextField from "../../../components/TextField/TextField";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import VerificationDropdown from "./VerificationDropdown";

import styles from "./AccountVerification.module.css";
import { HiPhoto } from "react-icons/hi2";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const CardInformation = (props) => {
    const { onNext } = props;

    const submitHandler = (event) => {
        event.preventDefault();

        onNext();
    };

    return (
        <div className={`${styles["personal-information-section"]}`}>
            <p
                className="smaller-text"
                style={{
                    color: "var(--fc-body-light)",
                    textAlign: "center",
                    padding: "0 37px",
                }}
            >
                Provide a proof that you are legitimate landlord/homeowner.
            </p>

            <form
                onSubmit={submitHandler}
                className={`${styles["personal-information-section-form"]}`}
            >
                <div className={`${styles["personal-information-row"]}`}>
                    <CardShadow>
                        <div
                            className={`${styles["personal-information-form"]}`}
                        >
                            <VerificationDropdown />
                        </div>
                    </CardShadow>

                    <CardShadow>
                        <div
                            className={`${styles["personal-information-col"]}`}
                        >
                            <p
                                className="title"
                                style={{ marginBottom: "12px", width: "100%" }}
                            >
                                Submit ID
                            </p>

                            <div
                                className={`${styles["identification-card"]}`}
                            >
                                <div className={styles.outer}>
                                    <div className={styles.inner}>
                                        <HiPhoto className={`${styles['card-icon-one']}`}/>
                                        <BsFillArrowUpSquareFill className={`${styles['card-icon-two']}`}/>
                                    </div>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <p className="title">Click here to upload image</p>
                                    <p className="smaller-text">Maximum size is 10MB</p>
                                </div>
                                <input type="file" className={`${styles['add-photo']}`} />
                            </div>
                        </div>

                        <p
                            className="smaller-text"
                            style={{
                                paddingTop: "12px",
                                textIndent: "5%",
                                textAlign: "justify",
                            }}
                        >
                            Please ensure that the photo you uploaded is clear
                            and words are readable. Additionally, the document
                            has not yet reached the end of its validity period
                            to avoid issues in verifying your account.
                        </p>
                    </CardShadow>
                </div>

                <PrimaryButton>Save</PrimaryButton>
            </form>
        </div>
    );
};

export default CardInformation;
