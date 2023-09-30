import React, { useState } from "react";

const CreateUnitContext = React.createContext({
    unitData: {},
    onUnitData: (data) => {},
    onReset: () => {},
});

export const CreateUnitContextProvider = (props) => {
    const [unitData, setUnitData] = useState({});

    const unitDataHandler = (data) => {
        console.log(data);
        setUnitData(data);
    };

    const resetUnitDataHandler = () => {
        setUnitData({});
    };

    return (
        <CreateUnitContext.Provider
            value={{
                unitData: unitData,
                onUnitData: unitDataHandler,
                onReset: resetUnitDataHandler,
            }}
        >
            {props.children}
        </CreateUnitContext.Provider>
    );
};

export default CreateUnitContext;
