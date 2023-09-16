import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";
import useNotistack from "../../../../../../hooks/notistack-hook";
import useUserManager from "../../../../../../hooks/data/users-hook";

import styles from "./EditRules.module.css";

const EditRules = (props) => {
    const { unitRules, unitId } = props;
    const { fetchRules } = useAttributeManager();
    const { updateUserRules, isLoading } = useUserManager();
    const navigate = useNavigate();
    const { notify } = useNotistack();

    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState(unitRules);

    const chipAmenityHandler = (value) => {
        console.log(value);
        setSelectedRules(value);
    };

    const saveAmenityHandler = (event) => {
        event.preventDefault();

        if (selectedRules.length === 0) {
            return;
        }

        selectedRules.forEach(async (element, index) => {
            try {
                const data = {
                    unit_id: Number(unitId),
                    rule_id: element.toString(),
                };
                const res = await updateUserRules(data);
            } catch (error) {}

            if (index === selectedRules.length - 1) {
                navigate("/manage_unit/edit/" + unitId);
                notify("Rules save successfully", "success");
            }
        });
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchRules();
                console.log(res);
                setRules(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form onSubmit={saveAmenityHandler}>
            <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["feature-main-title"]}`}>
                    <p className="title">Choose rules</p>
                </div>

                <div className={`${styles["feature-chip-col"]}`}>
                    <ChipBig
                        items={rules}
                        selected={selectedRules}
                        onChipValue={chipAmenityHandler}
                        background={"danger"}
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

export default EditRules;
