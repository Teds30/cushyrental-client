import { useState, useEffect, useContext } from "react";
import ChipBig from "../../../../components/Chips/ChipBig";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import CreateUnitContext from "../../../../context/create-unit-context";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const genders = [
    {
        id: "1",
        name: "Male",
        icon: "male.svg",
    },
    {
        id: "2",
        name: "Female",
        icon: "female.svg",
    },
    {
        id: "3",
        name: "All",
        icon: "allgender.svg",
    },
];

const GenderForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext);
    const genderData =
        createUnitCtx.unitData.target_gender !== undefined
            ? createUnitCtx.unitData.target_gender
            : "";

    const { onBack, onNext } = props;

    const [genderValue, setGenderValue] = useState(genderData);
    const [gender, setGender] = useState(genders);

    const chipValueHandler = (genderValue) => {
        setGenderValue(genderValue);
    };

    const backHandler = (event) => {
        event.preventDefault();

        if (genderValue) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                target_gender: genderValue,
            });
        }

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (genderValue === "") {
            return;
        }

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            target_gender: genderValue,
        });

        setGenderValue("");

        onNext();
    };

    return (
        <form
            className={`${styles["basic-details-form"]}`}
            onSubmit={submitHandler}
        >
            <div className="title">For what gender are you looking for?</div>

            <ChipBig
                items={gender}
                selected={genderValue}
                onChipValue={chipValueHandler}
                button={"radio"}
            />

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    );
};

export default GenderForm;
