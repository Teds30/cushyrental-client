import { useEffect, useState } from "react";
import useAttributeManager from "../../../hooks/data/attribute-hook";
import CheckBox from "./CheckBox";
import styles from "./UnitComparison.module.css";

const UnitInclusions = (props) => {
    const { inclusionsId } = props;

    const { fetchInclusions, isLoading } = useAttributeManager();
    const [inclusions, setInclusions] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchInclusions();
                setInclusions(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content = inclusions.map((inclusion) => {
        return (
            <CheckBox
                labelSize={"10px"}
                key={inclusion.id}
                isDisabled={"True"}
                items={[inclusion]}
                selectedValue={inclusionsId}
            />
        );
    });

    return (
        !isLoading &&
        inclusions.length !== 0 && (
            <div className={`${styles["attributes"]}`}>{content}</div>
        )
    );
};

export default UnitInclusions;
