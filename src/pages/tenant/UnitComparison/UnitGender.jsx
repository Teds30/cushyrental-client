import CheckBox from "./CheckBox";
import styles from './UnitComparison.module.css';

const gender = [
    {
        id: 1,
        name: 'Male'
    },
    {
        id: 2,
        name: 'Female'
    },
    {
        id: 3,
        name: 'Both'
    }
]

const UnitGender = (props) => {
    const { genderId } = props;

    const content = (<CheckBox
        labelSize={'10px'}
        isDisabled={'True'}
        items={gender}
        selectedValue={[genderId]}
    />);

    return <div className={`${styles['attributes']}`}>{content}</div>;
};

export default UnitGender;
