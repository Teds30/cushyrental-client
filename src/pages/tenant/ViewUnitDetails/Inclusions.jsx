import { useEffect, useState } from "react";

import useAttributeManager from "../../../hooks/data/attribute-hook";
import InclusionChip from "./InclusionChip";
import useImageManager from "../../../hooks/data/image-hook";

const Inclusions = (props) => {
    const { inclusions } = props;
    const { fetchIcon, isLoading } = useImageManager();

    const [inclusionData, setInclusionData] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const result = await Promise.all(
                    inclusions.map(async (inclusion) => {
                        const res = await fetchIcon(inclusion.icon);
                        return { ...inclusion, icon: res };
                    })
                );
                // console.log(result)
                setInclusionData(result);
            } catch (err) {
                console.error(err);
            }
        };
        handleFetch();
    }, [inclusions, fetchIcon]);

    return !isLoading && inclusionData.length !== 0 && <InclusionChip inclusions={inclusionData} />;
};

export default Inclusions;
