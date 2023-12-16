import React, { useRef } from 'react'

import { IoLocationOutline } from "react-icons/io5";
import styles from './SearchField.module.css'

const SearchField = (props) => {
    const { placeholder, searchData, onChange, width = '100%' } = props

    const searchRef = useRef()

    // const changeHandler = () => {
    //     searchData(searchRef.current.value)
    // }

    return (
        <div
            className={styles['search-container']}
            style={{ width: width }}
            {...props}
        >
            <form className={styles.search}>
                <div className={styles.icon}>
                    <IoLocationOutline style={{ fontSize: '24px' }} />
                </div>
                <input
                    type="text"
                    onChange={onChange}
                    ref={searchRef}
                    placeholder={placeholder}
                />
            </form>
        </div>
    )
}

export default SearchField
