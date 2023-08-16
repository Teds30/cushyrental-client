import { useState, useCallback } from "react";

import UserToggleButton from "./UserToggleButton";
import CreateAccountForm from "./CreateAccountForm";

import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const [userType, setUserType] = useState();

  const userTypeHandler = useCallback(
    (userType) => {
      setUserType(userType);
      console.log(userType);
    },
    [setUserType]
  );

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
            <CreateAccountForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
