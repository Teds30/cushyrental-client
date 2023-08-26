import { useState, useCallback, useEffect } from "react";

import UserToggleButton from "./UserToggleButton";
import CreateAccountForm from "./CreateAccountForm";
import { useGoogleLogin } from "@react-oauth/google";
import useAuth from "../../../hooks/data/auth-hook";
import useGoogleAuth from "../../../hooks/data/google-auth-hook";
import useFacebookAuth from "../../../hooks/data/facebook-auth";

import styles from "./CreateAccount.module.css";
import Warning from "./Warning";

const CreateAccount = () => {
  const { accountRegistration, isLoading } = useAuth();
  const { googleAccountRegistration, googleAuth } = useGoogleAuth();
  const { facebookAccountRegistration } = useFacebookAuth();

  const [warning, setWarning] = useState('');
  const [counter, setCounter] = useState(0);
  const [userType, setUserType] = useState({ user_type_id: "1" });

  const userTypeHandler = useCallback(
    (userType) => {
      setUserType(userType);
    },
    [setUserType]
  );

  const createAccountHandler = async (userData) => {
    const data = { ...userData, user_type_id: userType.user_type_id };

    try {
      const res = await accountRegistration(data);
      console.log(res);
    } catch (error) {
      setWarning(error);
    }
  };

  const googleRegisterHandle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await googleAuth(credentialResponse);

        const data = {
          first_name: res.given_name,
          last_name: res.family_name,
          email: res.email,
          profile_picture_img: res.picture,
          user_type_id: userType.user_type_id,
        };

        const registerGoogleRes = await googleAccountRegistration(data);
        console.log(registerGoogleRes);
      } catch (error) {
        setWarning(error);
      }
    },
  });

  const nameTransFunction = (nameParts) => {
    let first_name = nameParts.filter((element) => !element.includes("."));
    first_name.pop();
    first_name = first_name.join(" ");

    let middle_name = nameParts.filter((element) => element.includes("."));

    let last_name = nameParts[nameParts.length - 1];

    return {
      first_name: first_name,
      middle_name: middle_name.join(" "),
      last_name: last_name,
    };
  };

  const facebookRegisterHandler = async (response) => {
    const user_name = response.name.split(" ");

    const transform_name = nameTransFunction(user_name);

    const data = {
      first_name: transform_name.first_name,
      middle_name: !transform_name.middle_name
        ? ""
        : transform_name.middle_name,
      last_name: transform_name.last_name,
      email: response.email,
      profile_picture_img: response.picture.data.url,
      user_type_id: userType.user_type_id,
    };

    try {
      const res = await facebookAccountRegistration(data);
      console.log(res);
    } catch (error) {
      setWarning(error);
    }
  };

  useEffect(() => {
    if (warning !== '') {
      if (counter === 3) {
        setWarning('');
        setCounter(0);
        return;
      } else {
        const interval = setInterval(() => {
          setCounter((prevCounter) => prevCounter + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [counter, warning]);

  return (
    <div className={styles.container}>
      <div className={`${styles["container-title"]}`}>
        <h2>Create Account</h2>
      </div>
      {warning && <Warning warning={warning} />}
      <div className={`${styles["main-container"]}`}>
        <div className={`${styles["main-container-type"]}`}>
          <UserToggleButton onUserType={userTypeHandler} />
        </div>

        <div className={`${styles["main-container-form"]}`}>
          <CreateAccountForm
            onCreateAccount={createAccountHandler}
            isLoading={isLoading}
            onGoogleAuth={googleRegisterHandle}
            onfacebookAuth={facebookRegisterHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
