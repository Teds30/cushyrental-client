import TextField from "../../../../components/TextField/TextField";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import useValidate from "../../../../hooks/validate-input-hook";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";

const BasicDetailsForm = (props) => {
  const { onBasicDetails, unitDetails } = props;

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: enteredTitleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleReset,
  } = useValidate((value) => value.trim() !== "");
  const {
    value: enteredDetails,
    isValid: enteredDetailsIsValid,
    hasError: enteredDetailsHasError,
    valueChangeHandler: detailsChangeHandler,
    inputBlurHandler: detailsBlurHandler,
    reset: detailsReset,
  } = useValidate((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredTitleIsValid && enteredDetailsIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    onBasicDetails({
      title: enteredTitle,
      details: enteredDetails,
    });
  };

  return (
    <form
      className={`${styles["basic-details-form"]}`}
      onSubmit={submitHandler}
    >
      <div className="title">Basic Details</div>

      <TextField
        fullWidth
        label="Title"
        value={unitDetails ? unitDetails.title : enteredTitle}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        helperText={
          enteredTitleHasError && "Please enter the name of your boarding house."
        }
        error
      />

      <TextField
        fullWidth
        label="First Name"
        rows={4}
        multiline
        value={unitDetails ? unitDetails.details : enteredDetails}
        onChange={detailsChangeHandler}
        onBlur={detailsBlurHandler}
        helperText={enteredDetailsHasError && "Please enter the detials of your boarding house."}
        error
      />

      <div className={`${styles["basic-details-button"]}`}>
        <PrimaryButton disabled={!formIsValid} rightIcon={<EastIcon />}>
          Next
        </PrimaryButton>
      </div>
    </form>
  );
};

export default BasicDetailsForm;
