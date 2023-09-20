import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { BsBookmark } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import styles from "./ViewProfile.module.css";
import useImageManager from "../../hooks/data/image-hook";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

const LandlordUnit = (props) => {
    const { unit } = props;
    const { fetchIcon } = useImageManager();

    useEffect(() => {
        fetchData(amenity.icon)
    }, [])

    const fetchData = async (name) => {
        const res = await fetchIcon(name)
        setIcon(res)
    }

    return (
        <div
            key={unit.id}
            className={`${styles["unit-container"]} `}
            id={`user-${unit.id}`}
        >
            <div className={`${styles["image-unit-container"]} `}>
                <img src={unit.images.id} alt="Unit" />
            </div>
            <div className={`${styles["content-container"]} `}>
                <div className={`${styles["text-container"]} `}>
                    <div className={`${styles["left-side"]} `}>
                        <p className={styles["price"]}>Php {unit.price}</p>
                        <p>{unit.name}</p>
                    </div>
                    <div>
                        <IconButton
                            size="large"
                            edge="center"
                            color="inherit"
                            aria-label="menu"
                        >
                            <BsBookmark
                                style={{
                                    marginRight: "-16px",
                                    color: "var(--fc-strong)",
                                    fill: "var(--accent)",
                                }}
                            />
                        </IconButton>
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["rating-container"]} `}>
                    <p>RATING</p>
                    <div className={`${styles["star-container"]} `}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["amenities-container"]}`}>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            icon={<FaceIcon />}
                            label="With Icon"
                            variant="outlined"
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default LandlordUnit;
