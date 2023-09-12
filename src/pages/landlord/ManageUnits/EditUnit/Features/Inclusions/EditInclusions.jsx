import { useState, useEffect } from "react";
import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";

import styles from "./EditInclusions.module.css";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";

const EditInclusions = (props) => {
    const { unitInclusions } = props;
    const { fetchInclusions, isLoading } = useAttributeManager();

    const [ inclusions, setInclusions] = useState([]);
    const [selectedInclusions, setSelectedInclusions] =
        useState(unitInclusions);

    const chipAmenityHandler = (value) => {
        console.log(value);
        setSelectedInclusions(value);
    };

    const saveAmenityHandler = (event) => {
        event.preventDefault();

        if (inclusions.length === 0) {
            return;
        }

        console.log(selectedInclusions);
        console.log("save inclusions");
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchInclusions();
                setInclusions(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form onSubmit={saveAmenityHandler}>
            <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["amenity-main-title"]}`}>
                    <p className="title">Choose inclusions</p>
                </div>

                <div className={`${styles["feature-chip-col"]}`}>
                    <ChipBig
                        items={inclusions}
                        selected={selectedInclusions}
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

export default EditInclusions;
