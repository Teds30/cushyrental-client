import { useState, useEffect, useContext } from "react";

import useAttributeManager from "../../../../hooks/data/attribute-hook";
import ChipBig from "../../../../components/Chips/ChipBig";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import CreateUnitContext from "../../../../context/create-unit-context";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const AmenitiesForm = (props) => {
    const { onBack, onNext } = props;
    const createUnitCtx = useContext(CreateUnitContext);
    const amenityData = createUnitCtx.unitData.amenities ? createUnitCtx.unitData.amenities : [];

    const { isLoading, fetchAmenities } = useAttributeManager();
    const [amenityValue, setAmenityValue] = useState([]);
    const [amenities, setAmenities] = useState([]);

    const chipValueHandler = (amenityValue) => {
        setAmenityValue(amenityValue);
    };

    const backHandler = (event) => {
        event.preventDefault();

        if (amenityValue) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                amenities: amenityValue
            });
        }

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (amenityValue.length === 0) {
            return;
        }

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            amenities: amenityValue
        });

        setAmenityValue([]);

        onNext();
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchAmenities();
                setAmenities(res);

                if (res.length !== 0 && amenityData.length !== 0) {
                    const selectedAmenities = amenityData.filter((id) => {
                        return res.some(
                            (amenityfetch) => amenityfetch.id === id
                        );
                    });

                    console.log(selectedAmenities);

                    setAmenityValue(selectedAmenities);
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
            <div className={`${styles.title}`}>What amenities do your unit offer?</div>

            {isLoading ? (
                "Loading..."
            ) : (
                <ChipBig
                    items={amenities}
                    selected={amenityValue}
                    onChipValue={chipValueHandler}
                />
            )}

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton
                    rightIcon={<EastIcon />}
                >
                    Next
                </PrimaryButton>
            </div>
        </form>
    );
};

export default AmenitiesForm;
