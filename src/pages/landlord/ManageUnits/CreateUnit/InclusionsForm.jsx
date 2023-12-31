import { useState, useEffect, useContext } from "react";

import useAttributeManager from "../../../../hooks/data/attribute-hook";
import ChipBig from "../../../../components/Chips/ChipBig";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import CreateUnitContext from "../../../../context/create-unit-context";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const InclusionsForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext);
    const inclusionData = createUnitCtx.unitData.inclusions
        ? createUnitCtx.unitData.inclusions
        : [];

    const { onBack, onNext } = props;

    const { isLoading, fetchInclusions } = useAttributeManager();
    const [inclusionValue, setInclusionValue] = useState([]);
    const [amenities, setAmenities] = useState([]);

    const chipValueHandler = (inclusionValue) => {
        setInclusionValue(inclusionValue);
    };

    const backHandler = (event) => {
        event.preventDefault();

        if (inclusionValue) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                inclusions: inclusionValue,
            });
        }

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (inclusionValue.length === 0) {
            return;
        }

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            inclusions: inclusionValue,
        });

        onNext();
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchInclusions();
                setAmenities(res);

                if (res.length !== 0 && inclusionData.length !== 0) {
                    const selectedAmenities = inclusionData.filter((id) => {
                        return res.some(
                            (amenityfetch) => amenityfetch.id === id
                        );
                    });

                    setInclusionValue(selectedAmenities);
                }
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form
            className={`${styles["basic-details-form"]}`}
            onSubmit={submitHandler}
        >
            <div className={`${styles.title}`}>
                What inclusions do your unit offer?
            </div>

            {isLoading ? (
                "Loading..."
            ) : (
                <ChipBig
                    items={amenities}
                    selected={inclusionValue}
                    onChipValue={chipValueHandler}
                />
            )}

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    );
};

export default InclusionsForm;
