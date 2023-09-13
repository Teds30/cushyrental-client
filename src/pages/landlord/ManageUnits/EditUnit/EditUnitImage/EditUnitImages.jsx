import { Link } from "react-router-dom";
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

import styles from "./EditUnitImages.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import ImageIcon from '@mui/icons-material/Image';
import { BsTrashFill } from 'react-icons/bs'
// BiImageAdd
import photo from "../../../../../assets/Units/pics.png";

const EditUnitImages = (props) => {
    const { unitImages } = props;

    const { fetchImage, isLoading } = useImageManager();

    const [ImagesData, setImagesData] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);

    console.log(selectedImage);

    const imageHandler = (index) => {
        const isIncluded = selectedImage.includes(index);

        console.log(isIncluded);

        if (isIncluded) {
            setSelectedImage(selectedImage.filter((id) => id != index));
        } else {
            setSelectedImage([...selectedImage, index]);
        }
    };

    const addImageChangeHandler = (event) => {
        const image = URL.createObjectURL(event.target.files[0]);
        setImagesData([
            ...ImagesData,
            { image: image, name: event.target.files[0].name, is_thumbnail: 0 },
        ]);
    };

    const selectAllHandler = () => {
        setSelectedImage(ImagesData.map((image, index) => index))
    }

    const cancelHandler = () => {
        setSelectedImage([]);
    }

    const deleteImageHandler = () => {
        setImagesData(selectedImage.map((i) => {
            return ImagesData.filter((data, index) => index !== i)
        }));

        setSelectedImage([]);
    }

    const makeThumbnailHandler = () => {
        const imageIndex = selectedImage[0];

        setImagesData(ImagesData.map((data, index) => {
            if (data.is_thumbnail === 1) {
                return { ...data, is_thumbnail: 0 };
            } else if (index === imageIndex) {
                console.log('pumasok dito');
                return { ...data, is_thumbnail: 1 };
            } else {
                return data;
            }
        }));
    }

    const saveHandler = (event) => {};

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const promise = unitImages.map(async (data) => {
                    const res = await fetchImage(data.image);
                    return { ...data, image: res };
                });

                const newDataUpdate = await Promise.all(promise);
                // console.log(newDataUpdate);
                setImagesData(newDataUpdate);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content = ImagesData.map((image, index) => (
        <button
            key={index}
            className={`${styles["image-col"]} ${
                ImagesData.length === 0 ? styles["image-col-hidden"] : ""
              }`}
            onClick={() => imageHandler(index)}
        >
            <img src={image.image} alt={image.name} className={`${selectedImage.includes(index) && styles['image-background']}`} />
            {image.is_thumbnail === 1 && (
                <div className={styles.thumbnail}>
                    <p className="pre-title">THUMBNAIL</p>
                </div>
            )}

            {selectedImage.includes(index) && (
                <div
                    className={`${styles["selected-image"]}`}
                >
                    <CheckIcon />
                </div>
            )}
        </button>
    ))

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
                        <Link to={``}>
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
                            <PrimaryButton>Save</PrimaryButton>
                        </form>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["edit-image-main"]}`}>
                { isLoading ? 'Loading' : ImagesData.length === 0 ? <p>No image uploaded</p> : content }

                <div className={`${styles["edit-image-button"]}`}>
                    {selectedImage.length === 1 ? (
                        <Fragment>
                            <BorderlessButton onClick={cancelHandler}>Cancel</BorderlessButton>
                            <div className={`${styles["upload-image-button"]}`}>
                                <SecondaryButton
                                    width="100%"
                                    leftIcon={<ImageIcon />}
                                    onClick={makeThumbnailHandler}
                                >
                                    Make Thumbnail
                                </SecondaryButton>
                            </div>
                            <BorderedButton btnType="danger" onClick={deleteImageHandler}><BsTrashFill /></BorderedButton>
                        </Fragment>
                    ) : selectedImage.length > 1 ? (
                        <Fragment>
                            <BorderlessButton onClick={cancelHandler}>Cancel</BorderlessButton>
                            <div className={`${styles["upload-image-button"]} ${styles['many-selected-image']}`}>
                                <p style={{color: 'var(--fc-strong)'}}>Selected ({selectedImage.length})</p>
                            </div>
                            <BorderedButton btnType="danger" onClick={deleteImageHandler}><BsTrashFill /></BorderedButton>
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
                            <BorderlessButton onClick={selectAllHandler}>Select</BorderlessButton>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUnitImages;
