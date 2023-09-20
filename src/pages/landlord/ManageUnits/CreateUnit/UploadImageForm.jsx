import { useState, useContext } from "react";

import BorderlessButton from "../../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import SecondaryButton from "../../../../components/Button/SecondaryButton";
import CreateUnitContext from "../../../../context/create-unit-context";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MenuButton from "../../../../components/Menu/MenuButton";

const UploadImageForm = (props) => {
    const { onNext, onBack } = props;

    const createUnitCtx = useContext(CreateUnitContext);
    const uploadImageDetails =
        createUnitCtx.unitData.images === undefined
            ? []
            : createUnitCtx.unitData.images;

    const [unitImages, setUnitImages] = useState(uploadImageDetails); // Use an array to store multiple images

    const addImageChangeHandler = (event) => {
        console.log(URL.createObjectURL(event.target.files[0]))
        setUnitImages([...unitImages, event.target.files[0]]);
    };

    const removeHandler = (id) => {
        const newUnitImages = unitImages.filter((image, index) => index !== id);
        // setUnitImages(newUnitImages);
        if (newUnitImages.length === 0) {
            setUnitImages([]);
            return;
        }

        setUnitImages(newUnitImages);
    };

    const locationDraft = () => {
        if (unitImages) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                images: unitImages,
            });
        }
    };
    const backHandler = (event) => {
        event.preventDefault();

        locationDraft();

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (unitImages.length >= 3) {
            return;
        }

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            images: unitImages,
        });

        onNext();
    };

    const unitImagesContent =
        unitImages.length !== 0 &&
        unitImages.map((image, index) => {
            return (
                <div
                    key={image.name}
                    className={`${styles["upload-image-size"]}`}
                >
                    {index === 0 && (
                        <div className={styles.thumbnail}>
                            <p className="pre-title">THUMBNAIL</p>
                        </div>
                    )}
                    <div className={styles.menu}>
                        <MenuButton
                            options={["Remove"]}
                            id={index}
                            onRemove={removeHandler}
                        />
                    </div>
                    <img src={URL.createObjectURL(image)} alt="CushyRental" />
                </div>
            );
        });

    return (
        <form
            className={`${styles["basic-details-form"]}`}
            onSubmit={submitHandler}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <div className={`${styles.title}`}>Showcase your unit's layout</div>
                <div className="caption">
                    Upload at least 3 images of your unit.
                </div>
            </div>

            <div className={`${styles["upload-image"]}`}>
                {unitImagesContent}
            </div>

            <div className={`${styles["upload-image-button"]}`}>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={addImageChangeHandler}
                    multiple={false}
                />
                <SecondaryButton width="100%" leftIcon={<AddIcon />}>
                    {unitImages.length >= 1 ? "Add More" : "Add Image"}
                </SecondaryButton>
            </div>

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton leftIcon={<CheckCircleOutlineIcon />}>
                    Finish
                </PrimaryButton>
            </div>
        </form>
    );
};

export default UploadImageForm;
