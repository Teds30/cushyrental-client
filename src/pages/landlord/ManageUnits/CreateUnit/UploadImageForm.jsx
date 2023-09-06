import { useState } from "react";

import BorderlessButton from "../../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import SecondaryButton from "../../../../components/Button/SecondaryButton";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import photo from "../../../../assets/Units/pics.png";

const UploadImageForm = () => {
    const [unitImages, setUnitImages] = useState([]); // Use an array to store multiple images

    const addImageChangeHandler = (event) => {
        // Convert FileList to an array of files
        const filesArray = Array.from(event.target.files);
        
        // Set the state with the new array of files
        setUnitImages(filesArray);
    };

    const submitHandler = (event) => {
        // submit here
    };

    const backHandler = (event) => {
        event.preventDefault();
    };

    const unitImagesContent =
        unitImages.length !== 0 &&
        unitImages.map((image) => {
            return (
                <div key={image.name} className={`${styles["upload-image-size"]}`}>
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
                <div className="title">Showcase your unit's layout</div>
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
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    );
};

export default UploadImageForm;
