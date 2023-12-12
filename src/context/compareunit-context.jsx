import React, { useCallback, useEffect, useRef, useState } from 'react'

const CompareUnitContext = React.createContext({
    selectedUnits: [],
    handleSelectUnits: () => {},
    handleRemoveUnit: () => {},
})

export const CompareUnitContextProvider = (props) => {
    const [selectedUnits, setSelectedUnits] = useState([])

    const selectUnits = (newUnit) => {
        setSelectedUnits((prev) => {
            return [...prev, newUnit]
        })
    }

    const handleRemoveUnit = (id) => {
        console.log(id)
        const newList = selectedUnits.filter((item) => item.id !== id)
        setSelectedUnits(newList)
    }

    return (
        <CompareUnitContext.Provider
            value={{
                selectedUnits: selectedUnits,
                handleSelectUnits: selectUnits,
                handleRemoveUnit: handleRemoveUnit,
            }}
        >
            {props.children}
        </CompareUnitContext.Provider>
    )
}

export default CompareUnitContext
