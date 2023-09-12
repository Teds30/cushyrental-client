import { useState, useEffect } from "react";
import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";

import styles from "./EditRules.module.css";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";

const EditRules = (props) => {
    const { unitRules } = props;
    const { fetchRules, isLoading } = useAttributeManager();

    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] =
        useState(unitRules);

    const chipAmenityHandler = (value) => {
        console.log(value);
        setSelectedRules(value);
    };

    const saveAmenityHandler = (event) => {
        event.preventDefault();
        
        if (rules.length === 0) {
            return;
        }

        console.log(selectedRules);
        console.log("save rules");
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchRules();
                setRules(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form onSubmit={saveAmenityHandler}>
            <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["amenity-main-title"]}`}>
                    <p className="title">Choose rules</p>
                </div>

                <div className={`${styles["amenity-chip-col"]}`}>
                    <ChipBig
                        items={rules}
                        selected={selectedRules}
                        onChipValue={chipAmenityHandler}
                        background={'danger'}
                    />
                </div>
            </div>

            <div className={`${styles["feature-button"]}`}>
                <PrimaryButton width="100%">Save</PrimaryButton>
            </div>
        </form>
    );
};

export default EditRules;
