import { Fragment, useState } from "react";
import ChipBig from "../../../../../components/Chips/ChipBig";
const Others = (props) => {
    const { otherFacilities, onOther } = props;

    const [ facilityValue, setFacilityValue ] = useState([]);

    const facilityValueHandler = (data) => {
        setFacilityValue(data);
        onOther(data);
    } 

    return (
        <Fragment>
            <div className="title" style={{marginBottom: '12px'}}>Other</div>
            <ChipBig
            items={otherFacilities}
            selected={facilityValue}
            onChipValue={facilityValueHandler}
        />
        </Fragment>
    );
};

export default Others;
