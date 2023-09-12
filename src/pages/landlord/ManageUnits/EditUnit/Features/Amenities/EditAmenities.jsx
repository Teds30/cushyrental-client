import { useState, useEffect } from "react";
import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";

import styles from "./EditAmenities.module.css";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";

const EditAmenities = (props) => {
    const { unitAmenities } = props;
    const { fetchAmenities, isLoading } = useAttributeManager();

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState(unitAmenities);

    const chipAmenityHandler = (value) => {
        console.log(value);
        setSelectedAmenities(value);
    };

    const saveAmenityHandler = (event) => {
        event.preventDefault()

        if (amenities.length === 0) {
            return;
        }

        console.log(selectedAmenities);
        console.log("save amenities");
    } 

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchAmenities();
                setAmenities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form onSubmit={saveAmenityHandler}>
            <div className={`${styles["feature-main"]}`}>
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
            </div>

            <div className={`${styles["feature-button"]}`}>
                <PrimaryButton width="100%">Save</PrimaryButton>
            </div>
        </form>
    );
};

export default EditAmenities;
