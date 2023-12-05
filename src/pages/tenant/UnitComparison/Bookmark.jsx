import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

import UnitBookmarkPhoto from "./UnitBookmarkPhoto";
import CheckBox from "../../../components/CheckBox/CheckBox";

import styles from "./Bookmark.module.css";
import { GrGallery } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import photo from "../../../assets/Units/pics.png";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const Bookmark = (props) => {
    const { units, onSelectedUnitList, selectedUnitList, onCompare } = props;

    const [selectedUnit, setSelectedUnit] = useState(selectedUnitList);

    const cancelHandler = () => {
        setSelectedUnit([]);
    }

    const comapareHandler = () => {
        const selectedUnits = units.filter((unit) => selectedUnit.includes(unit.id));

        // console.log(selectedUnits);



        // console.log(selectedUnits);

        onSelectedUnitList(selectedUnits);
    }

    useEffect(() => {
        const selectedHandler = () => {
            if (selectedUnit.length > 3) {
                setSelectedUnit(selectedUnit.slice(1));
            }
        }

        if (selectedUnit.length > 3) {
            selectedHandler();
        }
    }, [selectedUnit]);

    const content = units.map((unit) => {
        const imageThumbnail = unit.images.filter(image => image.is_thumbnail === 1).shift();

        return (
            <div key={unit.id} className={`${styles["bookmark-row"]}`}>
                <div className={`${styles["bookmark-col"]}`}>
                    <div className={`${styles["unit-photo"]}`}>
                        <UnitBookmarkPhoto images={imageThumbnail !== undefined ? imageThumbnail : unit.images[0]}/>
                        {/* <img src={photo} alt="" /> */}

                        <div className={`${styles["unit-number"]}`}>
                            <GrGallery
                                style={{
                                    height: "14px",
                                    width: "14px",
                                    fill: "var(--border-color)",
                                }}
                            />
                            <p className="smaller-text">{unit.images.length}</p>
                        </div>
                    </div>

                    <div className={`${styles["unit-details"]}`}>
                        <p className={`${styles["unit-title"]}`}>{unit.name}</p>
                        <Rating
                            value={unit.avergae_ratings}
                            precision={0.5}
                            sx={{
                                fontSize: "13px",
                                color: "var(--accent)",
                                "& svg": {
                                    fill: "var(--accent)",
                                },
                            }}
                        />
                        <p className={`${styles["unit-info"]}`}>
                            Php {unit.price.toFixed(2)}
                        </p>
                        <div className={`${styles["unit-location"]}`}>
                            <IoLocationOutline style={{ color: "#5C6173" }} />
                            <p className={`${styles["unit-info"]}`}>
                                {unit.address}
                            </p>
                        </div>
                    </div>

                    <div className={`${styles["select-unit"]}`}>
                        <div className={`${styles["check-box"]}`}>
                            <CheckBox
                                items={[{ id: unit.id, name: "" }]}
                                selectedValue={selectedUnit}
                                onSelectedUsers={setSelectedUnit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={`${styles["bookmark-main"]}`}>
            <p className={`${styles["favorites-title"]}`}>Select Unit</p>

            {content}

            <div className={`${styles['unit-comparison-button']}`}>
                <div className={`${styles['unit-selected']}`}>
                    <p>Selected {selectedUnit.length}/3</p>
                    <BorderlessButton onClick={cancelHandler}>Cancel</BorderlessButton>
                </div>
                <PrimaryButton onClick={comapareHandler} disabled={selectedUnit.length < 1 ? true : false}>Compare</PrimaryButton>
            </div>
        </div>
    );
};

export default Bookmark;
