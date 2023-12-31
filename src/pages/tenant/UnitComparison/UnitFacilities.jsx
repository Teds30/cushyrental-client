import { useEffect, useState } from "react";
import useAttributeManager from "../../../hooks/data/attribute-hook";
import CheckBox from "./CheckBox";
import styles from "./UnitComparison.module.css";

const facilityExclusive = [
    {
        id: 1,
        name: "Owned",
    },
    {
        id: 2,
        name: "Shared",
    },
];

const UnitFacilities = (props) => {
    const { unitFacilities } = props;

    const { fetchFacilities, isLoading } = useAttributeManager();
    const [facilities, setfacilities] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchFacilities();
                setfacilities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content = facilities.map((facility) => {
        const exclusive = unitFacilities
            .filter((unitFacility) => {
                if (unitFacility.id === facility.id) {
                    return unitFacility;
                }
            })
            .shift();

        if (exclusive !== undefined) {
            if (exclusive.is_shared === 0) {
                return (
                    <div key={facility.id} className={`${styles["facilities"]}`}>
                        <p className={`${styles["facility-name"]}`}>
                            {facility.name}
                        </p>
    
                        <CheckBox
                            isDisabled={"True"}
                            items={facilityExclusive}
                            selectedValue={[exclusive.is_shared + 1]}
                            labelSize={"10px"}
                        />
                    </div>
                );
            }
        }
    });

    return (
        !isLoading &&
        facilities.length !== 0 && (
            <div className={`${styles["attributes"]}`}>{content}</div>
        )
    );
};

export default UnitFacilities;
