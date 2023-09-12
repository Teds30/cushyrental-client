import { useState, useEffect } from "react";
import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";

import styles from "./EditFacilities.module.css";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";

const EditAmenities = (props) => {
    const { unitFacilities } = props;
    const { fetchFacilities, isLoading } = useAttributeManager();

    const [facilities, setFacilities] = useState([]);

    const chipAmenityHandler = (value) => {
        console.log(value);
        setSelectedFacilities(value);
    };

    const saveAmenityHandler = (event) => {
        event.preventDefault()
        console.log(selectedFacilities);
        console.log("save facilities");
    } 

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchFacilities();
                setFacilities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form onSubmit={saveAmenityHandler}>
            {/* <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["amenity-main-title"]}`}>
                    <p className="title">Choose unit amenities</p>
                </div>

                <div className={`${styles["amenity-chip-col"]}`}>
                    <ChipBig
                        items={amenities}
                        selected={selectedAmenities}
                        onChipValue={chipAmenityHandler}
                    />
                </div>
            </div> */}

            <div className={`${styles["feature-button"]}`}>
                <PrimaryButton width="100%">Save</PrimaryButton>
            </div>
        </form>
    );
};

export default EditAmenities;
