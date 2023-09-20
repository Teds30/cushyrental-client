import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";
import useNotistack from "../../../../../../hooks/notistack-hook";
import useUserManager from "../../../../../../hooks/data/users-hook";

import styles from "./EditInclusions.module.css";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";

const EditInclusions = (props) => {
    const { unitInclusions, unitId } = props;
    const { fetchInclusions } = useAttributeManager();
    const { updateUserInclusions, isLoading } = useUserManager();
    const { notify } = useNotistack();
    const navigate = useNavigate();

    const [inclusions, setInclusions] = useState([]);
    const [selectedInclusions, setSelectedInclusions] =
        useState(unitInclusions);

    const chipAmenityHandler = (value) => {
        setSelectedInclusions(value);
    };

    const saveAmenityHandler = (event) => {
        event.preventDefault();

        if (selectedInclusions.length === 0) {
            return;
        }

        selectedInclusions.forEach(async (element, index) => {
            try {
                const data = {
                    unit_id: Number(unitId),
                    inclusion_id: element,
                };
                const res = await updateUserInclusions(data);
            } catch (error) {}

            if (index === selectedInclusions.length - 1) {
                navigate("/manage_unit/edit/" + unitId);
                notify("Inclusions save successfully", "success");
            }
        });
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
                <PrimaryButton
                    width="100%"
                    isLoading={isLoading}
                    loadingText="Saving"
                >
                    Save
                </PrimaryButton>
            </div>
        </form>
    );
};

export default EditInclusions;
