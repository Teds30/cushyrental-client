import { useState } from "react";
import { Link } from "react-router-dom";

import TextField from "../../../components/TextField/TextField";
import Dropdown from "../../../components/Dropdown/Dropdown";
import PrimaryButton from "../../../components/Button/PrimaryButton";

import styles from "./CreateAccount.module.css";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import google from '../../../assets/google.svg'

const CreateAccountForm = (props) => {
  const [dropdownValue, setDropDownValue] = useState("");

  const dropdownValueHandler = (event) => {
    setDropDownValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <form className={`${styles["form-container"]}`}>
      <div className={`${styles["form-container-identity"]}`}>
        <TextField fullWidth label="First Name" />
        <TextField fullWidth label="Last Name" />
      </div>

      <div className={`${styles["form-container-info"]}`}>
        <Dropdown
          fullWidth
          label="Gender"
          selected={dropdownValue}
          items={[
            { id: 0, name: "Male" },
            { id: 1, name: "Female" },
          ]}
          handleSelect={dropdownValueHandler}
          selectedValue={dropdownValue}
        />
        <TextField fullWidth label="Phone Number" />
        <TextField type="email" fullWidth label="Email" />
        <TextField type="password" fullWidth label="Password" />
        <TextField type="password" fullWidth label="Confirm Password" />
      </div>

      <div className={`${styles["sign-up-btn"]}`}>
        <PrimaryButton width="100%">SIGN UP</PrimaryButton>
      </div>

      <div className={`${styles["sign-up-socmed"]}`}>
        <div className={styles.hr}></div>
        <div className={styles.option}>Or Sign Up with</div>
        <div className={styles.hr}></div>
      </div>

      <div className={styles.socmed}>
        <Link>
          <div className={styles["back"]}>
            <FacebookOutlinedIcon size="large" style={{ color: "#4267B2" }} /> Facebook
          </div>
        </Link>

        <Link>
          <div className={styles["back"]}>
          <img src={google} alt="Google Icon" className={styles.googleIcon} /> Google
          </div>
        </Link>
      </div>

      <div className={`${styles['login-option']}`}>
        <span>Already have an account? </span>
        <span><Link>Log In</Link></span>
      </div>
    </form>
  );
};

export default CreateAccountForm;
