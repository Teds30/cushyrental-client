import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

import PrimaryButton from "../../../../../components/Button/PrimaryButton";
import SecondaryButton from "../../../../../components/Button/SecondaryButton";
import BorderlessButton from "../../../../../components/Button/BorderlessButton";
import BorderedButton from "../../../../../components/Button/BorderedButton";
import useImageManager from "../../../../../hooks/data/image-hook";
import useUserManager from "../../../../../hooks/data/users-hook";
import useNotistack from "../../../../../hooks/notistack-hook";

import styles from "./EditUnitImages.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import ImageIcon from "@mui/icons-material/Image";

// import photo from "../../../../../assets/Units/pics.png"

// import photo from "../../../../../assets/Units/pics.png";

const EditUnitImages = (props) => {
    const { unitImages, unitId } = props;

    const { fetchImage, isLoading } = useImageManager();
    const { updateUserImages, deleteUserImages } = useUserManager();
    const { notify } = useNotistack();
    const navigate = useNavigate();

    const [imagesData, setImagesData] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [imagesDeleted, setImagesDeleted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const imageHandler = (index) => {
        const isIncluded = selectedImage.includes(index);

        if (isIncluded) {
            setSelectedImage(selectedImage.filter((id) => id != index));
        } else {
            setSelectedImage([...selectedImage, index]);
        }
    };

    const addImageChangeHandler = (event) => {
        setImagesDeleted(false);
        const image = URL.createObjectURL(event.target.files[0]);
        setImagesData([
            ...imagesData,
            {
                image: image,
                name: event.target.files[0].name,
                is_thumbnail: 0,
                file: event.target.files[0],
            },
        ]);
    };

    const selectAllHandler = () => {
        setSelectedImage(imagesData.map((image, index) => index));
    };

    const cancelHandler = () => {
        setSelectedImage([]);
    };

    const deleteImageHandler = async () => {
        const updatedImages = [];

        for (let index = 0; index < imagesData.length; index++) {
            const data = imagesData[index];

            if (data.id !== undefined && selectedImage.includes(index)) {
                try {
                    const imageData = {
                        unit_id: Number(unitId),
                        image_id: data.id,
                    };
                    const result = await deleteUserImages(imageData);
                } catch (error) {
                }
            } else {
                updatedImages.push(data);
            }
        }

        setImagesData(updatedImages);

        if (updatedImages.length === 0) {
            setImagesDeleted(true);
        }
        setSelectedImage([]);
    };

    const makeThumbnailHandler = () => {
        const imageIndex = selectedImage[0];

        setImagesData(
            imagesData.map((data, index) => {
                if (data.is_thumbnail === 1) {
                    return { ...data, is_thumbnail: 0 };
                } else if (index === imageIndex) {
                    console.log("pumasok dito");
                    return { ...data, is_thumbnail: 1 };
                } else {
                    return data;
                }
            })
        );
    };

    const handleFileUpload = async (image, index) => {
        let exit = false;

        if (image.id !== undefined) {
            try {
                const imageData = {
                    unit_id: Number(unitId),
                    image_id: image.id,
                    is_thumbnail: image.is_thumbnail,
                };
                const result = await updateUserImages(imageData);
                exit = true;
            } catch (error) {}
        }

        if (exit === true) {
            if (index === imagesData.length - 1) {
                setIsSaving(false);
                navigate("/manage_unit/edit/" + unitId);
                notify("Save successfully", "success");
            }
            return;
        }

        const formData = new FormData();

        formData.append("image", image.file);
        formData.append("name", image.name);
        formData.append("path", "images");

        try {
            const res = await fetch("http://127.0.0.1:8000/api/image-upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            const imageData = {
                unit_id: Number(unitId),
                image_id: data.image.id,
                is_thumbnail: image.is_thumbnail,
            };
            const result = await updateUserImages(imageData);

            if (index === imagesData.length - 1) {
                setIsSaving(false);
                navigate("/manage_unit/edit/" + unitId);
                notify("Save successfully", "success");
            }
        } catch (err) {}
    };

    const saveHandler = (event) => {
        event.preventDefault();

        if (imagesData.length === 0) {
            return;
        }

        setIsSaving(true);

        imagesData.forEach((element, index) => {
            handleFileUpload(element, index);
        });
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const promise = unitImages.map(async (data) => {
                    const res = await fetchImage(
                        data.image.replace("images/", "")
                    );
                    return { ...data, image: res };
                });

                const newDataUpdate = await Promise.all(promise);
                setImagesData(newDataUpdate);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content = imagesData.map((image, index) => (
        <button
            key={index}
            className={`${styles["image-col"]} ${
                imagesData.length === 0 ? styles["image-col-hidden"] : ""
            }`}
            onClick={() => imageHandler(index)}
        >
            <img
                src={image.image}
                alt={image.name}
                className={`${
                    selectedImage.includes(index) && styles["image-background"]
                }`}
            />
            {image.is_thumbnail === 1 && (
                <div className={styles.thumbnail}>
                    <p className="pre-title">THUMBNAIL</p>
                </div>
            )}

            {selectedImage.includes(index) && (
                <div className={`${styles["selected-image"]}`}>
                    <CheckIcon />
                </div>
            )}
        </button>
    ));

    return (
        <div className={`${styles["edit-image-container"]}`}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                        borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link to={`/manage_unit/edit/${unitId}`}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: "var(--fc-strong)",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box>
                            <p className="title">Edit images</p>
                        </Box>
                        <form onSubmit={saveHandler}>
                            <PrimaryButton
                                isLoading={isSaving}
                                loadingText="Saving"
                            >
                                Save
                            </PrimaryButton>
                        </form>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["edit-image-main"]}`}>
                {isLoading ? (
                    "Loading"
                ) : imagesDeleted ? (
                    <p>No image uploaded</p>
                ) : (
                    content
                )}

                <div className={`${styles["edit-image-button"]}`}>
                    {selectedImage.length === 1 ? (
                        <Fragment>
                            <BorderlessButton onClick={cancelHandler}>
                                Cancel
                            </BorderlessButton>
                            <div className={`${styles["upload-image-button"]}`}>
                                <SecondaryButton
                                    width="100%"
                                    leftIcon={<ImageIcon />}
                                    onClick={makeThumbnailHandler}
                                >
                                    Make Thumbnail
                                </SecondaryButton>
                            </div>
                            <BorderedButton
                                btnType="danger"
                                onClick={deleteImageHandler}
                            >
                                <BsTrashFill />
                            </BorderedButton>
                        </Fragment>
                    ) : selectedImage.length > 1 ? (
                        <Fragment>
                            <BorderlessButton onClick={cancelHandler}>
                                Cancel
                            </BorderlessButton>
                            <div
                                className={`${styles["upload-image-button"]} ${styles["many-selected-image"]}`}
                            >
                                <p style={{ color: "var(--fc-strong)" }}>
                                    Selected ({selectedImage.length})
                                </p>
                            </div>
                            <BorderedButton
                                btnType="danger"
                                onClick={deleteImageHandler}
                            >
                                <BsTrashFill />
                            </BorderedButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className={`${styles["upload-image-button"]}`}>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={addImageChangeHandler}
                                    multiple={false}
                                />

                                <SecondaryButton
                                    width="100%"
                                    leftIcon={<BiImageAdd />}
                                >
                                    Add Image
                                </SecondaryButton>
                            </div>
                            <BorderlessButton onClick={selectAllHandler}>
                                Select
                            </BorderlessButton>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUnitImages;
