import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useUnitManager from "../../../../../hooks/data/units-hook";
import EditUnitImages from "./EditUnitImages";

const UnitImageData = () => {
    const { id } = useParams();

    const { fetchUnit, isLoading } = useUnitManager();
    
    const [ unitImages, setUnitImages ] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnit(id);
                setUnitImages(res.images);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return !isLoading && unitImages.length !== 0 ? <EditUnitImages unitImages={unitImages} unitId={id} /> : '';
};

export default UnitImageData;
