import { useState } from 'react'

import { TbPlus, TbMinus } from 'react-icons/tb'

import styles from './Quantity.module.css'

const Quantity = (props) => {
    const { maxValue = 0 } = props

    const [value, setValue] = useState(0)

    const incrementHandler = () => {
        if (value + 1 > maxValue) {
            return
        }

        setValue(value + 1)
        props.onQuantity({ value: value + 1 })
    }

    const decrementHandler = () => {
        if (value === 0) {
            return
        }

        setValue(value - 1)
        props.onQuantity({ value: value - 1 })
    }

    return (
        <div className={styles.card}>
            <button className={styles.button} onClick={decrementHandler}>
                <TbMinus size={24} />
            </button>
            <div className={styles.count}>{value}</div>
            <button className={styles.button} onClick={incrementHandler}>
                <TbPlus size={24} />
            </button>
        </div>
    )
}

export default Quantity
