import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import EditUnit from "./EditUnit";
import useUnitManager from "../../../../hooks/data/units-hook";

const UnitData = () => {
    const { id } = useParams();
    const { fetchUnit, isLoading } = useUnitManager()

    const [userUnits, setUserUnits] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnit(id);
                setUserUnits(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return !isLoading && userUnits.length !== 0 ? <EditUnit userUnit={userUnits} /> : '';
}

export default UnitData;