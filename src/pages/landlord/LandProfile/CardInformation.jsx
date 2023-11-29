import { useContext, useState, Fragment } from "react";

import CardShadow from "../../../components/Card/CardShadow";
import TextField from "../../../components/TextField/TextField";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import VerificationDropdown from "./VerificationDropdown";
import VerifyAccountContext from "../../../context/verify-account-context";
import useNotistack from "../../../hooks/notistack-hook";
import useImageManager from "../../../hooks/data/image-hook";

import styles from "./AccountVerification.module.css";
import { HiPhoto } from "react-icons/hi2";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const CardInformation = (props) => {
    const { onNext } = props;
    const verifyCtx = useContext(VerifyAccountContext);
    const { notify } = useNotistack();
    const {uploadImage} = useImageManager();

    const [id, setId] = useState("");
    const [idImage, setIdImage] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const iDHandler = (id) => {
        setId(id);
    };

    const addImageChangeHandler = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile.size <= 10 * 1024 * 1024) {
            const image = URL.createObjectURL(selectedFile);
            setIdImage({
                file: selectedFile,
                image: image,
                name: selectedFile.name,
            });
        } else {
            notify("Image too big!", "Info");
        }
    };

    const handleFileUpload = async () => {

        try {

            const data =  await uploadImage({file: idImage.file, name: idImage.name, path: "identification_card"});

            verifyCtx.onVerify({
                ...verifyCtx.userAccount,
                identification_card_type_id: Number(id),
                submitted_id_image_url: data.name,
            });
            onNext();
        } catch (err) {}
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (id === "" || Object.keys(idImage).length === 0) {
            return;
        }

        setIsSaving(true);

        handleFileUpload();

        // onNext();
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
                            <VerificationDropdown
                                onIdentificationCard={iDHandler}
                            />
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

                            <div className={`${styles["identification-card"]}`}>
                                {Object.keys(idImage).length > 0 ? (
                                    <img
                                        src={idImage.image}
                                        alt={idImage.name}
                                    />
                                ) : (
                                    <Fragment>
                                        <div className={styles.outer}>
                                            <div className={styles.inner}>
                                                <HiPhoto
                                                    className={`${styles["card-icon-one"]}`}
                                                />
                                                <BsFillArrowUpSquareFill
                                                    className={`${styles["card-icon-two"]}`}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <p className="title">
                                                Click here to upload image
                                            </p>
                                            <p className="smaller-text">
                                                Maximum size is 10MB
                                            </p>
                                        </div>
                                    </Fragment>
                                )}
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={addImageChangeHandler}
                                    multiple={false}
                                    className={`${styles["add-photo"]}`}
                                />
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

                <PrimaryButton isLoading={isSaving} loadingText="Saving">
                    Save
                </PrimaryButton>
            </form>
        </div>
    );
};

export default CardInformation;
