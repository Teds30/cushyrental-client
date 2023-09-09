import { Fragment, useState } from "react";
import ChipBig from "../../../../../components/Chips/ChipBig";
import styles from '../CreateUnit.module.css';

const Others = (props) => {
    const { otherFacilities, onOther } = props;

    const [ facilityValue, setFacilityValue ] = useState([]);

    const facilityValueHandler = (data) => {
        setFacilityValue(data);
        onOther(data);
    } 

    return (
        <Fragment>
            <div className={`${styles.title}`} style={{marginBottom: '12px'}}>Other</div>
            <ChipBig
            items={otherFacilities}
            selected={facilityValue}
            onChipValue={facilityValueHandler}
        />
        </Fragment>
    );
};

export default Others;
