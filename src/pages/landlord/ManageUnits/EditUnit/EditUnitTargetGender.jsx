import { useState } from 'react';
import ChipBig from '../../../../components/Chips/ChipBig';

import styles from './EditUnit.module.css';

const gender = [
    {
        id: 1,
        icon: 'male.svg',
        name: 'Male'
    },
    {
        id: 2,
        icon: 'female.svg',
        name: 'Female'
    },
    {
        id: 3,
        icon: 'both.svg',
        name: 'All'
    },

]

const EditUnitTargetGender = (props) => {
    const { targetGender, onTargetGender } = props;

    const chipValueHandler = (value) => {
        onTargetGender(value);
    }

    return (
        <div className={`${styles['target-gender-container']}`}>
            <p className={`${styles["unit-details-title"]}`}>Target Gender</p>
            
            <ChipBig items={gender} selected={[targetGender]} onChipValue={chipValueHandler} button={'radio'} />
        </div>
    );
};

export default EditUnitTargetGender;