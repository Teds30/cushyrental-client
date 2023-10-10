import { useEffect, useState } from "react";

import ChipOutlined from "../../../components/Chips/ChipOutlined";

const Facilities = (props) => {
    const { facilities } = props;

    return (
        <ChipOutlined
            items={facilities}
            clickable={false}
        />
    );
};

export default Facilities;
