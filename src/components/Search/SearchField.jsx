import React, { useRef } from 'react'

import { FiSearch } from 'react-icons/fi'
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
                    <FiSearch />
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
