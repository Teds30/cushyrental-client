import { useState } from "react";

import { TbPlus, TbMinus } from "react-icons/tb";

import styles from "./Quantity.module.css";

const Quantity = (props) => {
    const { maxValue = 0, setQuantityvalue = 0, styled = false } = props;

    console.log(setQuantityvalue);

    const [value, setValue] = useState(setQuantityvalue);

    const incrementHandler = () => {
        if (value + 1 > maxValue) {
            return;
        }

        setValue(value + 1);
        props.onQuantity({ value: value + 1 });
    };

    const decrementHandler = () => {
        if (value === 0) {
            return;
        }

        setValue(value - 1);
        props.onQuantity({ value: value - 1 });
    };

    return (
        <div className={`${styles['card']} ${styled && styles['styled-quantity']}`}>
            <button type="button" className={styles.button} onClick={decrementHandler}>
                <TbMinus size={24} />
            </button>
            <div className={styles.count}>{value}</div>
            <button type="button" className={styles.button} onClick={incrementHandler}>
                <TbPlus size={24} />
            </button>
        </div>
    );
};

export default Quantity;
