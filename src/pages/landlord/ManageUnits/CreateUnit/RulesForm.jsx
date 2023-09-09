import { useState, useEffect, useContext } from "react";

import useAttributeManager from "../../../../hooks/data/attribute-hook";
import ChipBig from "../../../../components/Chips/ChipBig";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import CreateUnitContext from "../../../../context/create-unit-context";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const RulesForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext);
    const rulesData = createUnitCtx.unitData.rules ? createUnitCtx.unitData.rules : [];

    const { onBack, onNext} = props;

    const { isLoading, fetchRules } = useAttributeManager();
    const [ruleValue, setRuleValue] = useState([]);
    const [rules, setRules] = useState([]);

    const chipValueHandler = (ruleValue) => {
        setRuleValue(ruleValue);
    };

    const backHandler = (event) => {
        event.preventDefault();

        if (ruleValue) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                rules: ruleValue
            });
        }

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (ruleValue.length === 0) {
            return;
        }

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            rules: ruleValue
        });

        setRuleValue([]);

        onNext();
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchRules();
                setRules(res);

                if (res.length !== 0 && rulesData.length !== 0) {
                    const selectedRules = rulesData.filter((id) => {
                        return res.some(
                            (ruleFetch) => ruleFetch.id === id
                        );
                    });

                    setRuleValue(selectedRules);
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
            <div className={`${styles.title}`}>What are the unit rules?</div>

            {isLoading ? (
                "Loading..."
            ) : (
                <ChipBig
                    items={rules}
                    selected={ruleValue}
                    onChipValue={chipValueHandler}
                    background={'danger'}
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

export default RulesForm;
