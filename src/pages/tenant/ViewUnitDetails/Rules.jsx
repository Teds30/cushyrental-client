import { useEffect, useState } from "react";

import useAttributeManager from "../../../hooks/data/attribute-hook";
import ChipOutlined from "../../../components/Chips/ChipOutlined";

const Amenities = (props) => {
    const { rules } = props;

    return (
        <ChipOutlined
            items={rules}
            clickable={false}
        />
    );
};

export default Amenities;