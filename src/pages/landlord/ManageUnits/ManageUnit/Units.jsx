import { Fragment } from "react";

import styles from './ManageUnit.module.css';

import Unit from "./Unit";

const Units = (props) => {
    const { userUnits } = props;

    const content = userUnits.map(unit => <Unit key={unit.id} user_unit={unit} />)

    return (
        <div className={`${styles['units-col']}`}>
            { content }
        </div>
    );
};

export default Units;
