import { useEffect, useState } from "react";

import ChipOutlined from "../../../components/Chips/ChipOutlined";

const Amenities = (props) => {
    const { amenities } = props;

    return (
        <ChipOutlined
            items={amenities}
            clickable={false}
        />
    );
};

export default Amenities;
