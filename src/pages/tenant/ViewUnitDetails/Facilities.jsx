import { useEffect, useState } from "react";

import ChipOutlined from "../../../components/Chips/ChipOutlined";

const Facilities = (props) => {
    const { facilities } = props;

    console.log(facilities);

    return (
        <ChipOutlined
            items={facilities}
            clickable={false}
        />
        // <p>Hello John C. Otilla</p>
    );
};

export default Facilities;
