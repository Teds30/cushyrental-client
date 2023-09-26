import React, { useState } from "react";

const VerifyAccountContext = React.createContext({
    userAccount: {},
    onVerify: (data) => {},
    onReset: () => {},
});

export const VerifyAccountContextProvider = (props) => {
    const [verifyAccount, setVerifyAccount] = useState({});

    const verifyHandler = (data) => {
        console.log(data);
        setVerifyAccount(data);
    };

    const resetVerifyHandler = () => {
        setUnitData({});
    };

    return (
        <VerifyAccountContext.Provider
            value={{
                userAccount: verifyAccount,
                onVerify: verifyHandler,
                onResetFunction: resetVerifyHandler,
            }}
        >
            {props.children}
        </VerifyAccountContext.Provider>
    );
};

export default VerifyAccountContext;
