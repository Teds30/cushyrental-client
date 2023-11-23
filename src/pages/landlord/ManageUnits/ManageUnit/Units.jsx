import { Fragment, useState } from "react";

import styles from './ManageUnit.module.css';

import Unit from "./Unit";

const Units = (props) => {
    const { userUnits, onDeleteUnit } = props;

    const deleteUnitHandler = (id) => {
        onDeleteUnit(id);
    }

    const content = userUnits.map(unit => <Unit key={unit.id} user_unit={unit} onDeleteUnit={deleteUnitHandler} />)

    return (
        <div className={`${styles['units-col']}`}>
            { content }
        </div>
    );
};

export default Units;
