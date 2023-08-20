import { useState, useCallback } from "react";

import UserToggleButton from "./UserToggleButton";
import CreateAccountForm from "./CreateAccountForm";
import useAuth from "../../../hooks/data/auth-hook";

import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const { accountRegistration, isLoading } = useAuth();
  const [userType, setUserType] = useState({user_type_id: '1'});

  const userTypeHandler = useCallback(
    (userType) => {
      setUserType(userType);
    },
    [setUserType]
  );

  const createAccountHandler = async (userData) => {
    const data = {...userData, user_type_id: userType.user_type_id};

    console.log(data);

    try {
      const res = await accountRegistration(data);
      console.log(res);
    } catch(error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles["container-title"]}`}>
        <h2>Create Account</h2>
      </div>

      <div className={`${styles["main-container"]}`}>
        <div className={`${styles["main-container-type"]}`}>
          <UserToggleButton onUserType={userTypeHandler} />
        </div>

        <div className={`${styles["main-container-form"]}`}>
          <CreateAccountForm onCreateAccount={createAccountHandler} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
