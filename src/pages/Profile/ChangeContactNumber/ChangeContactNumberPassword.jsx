import TextField from '../../../components/TextField/TextField'
import useValidate from '../../../hooks/validate-input-hook'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import useUserManager from '../../../hooks/data/users-hook'
import useNotistack from '../../../hooks/notistack-hook'
import TextFieldAdornedPassword from '../../../components/TextFieldAdorned/TextFieldAdornedPassword'
import useLogin from '../../../hooks/data/login-hook'

import styles from './ChangeContactNumber.module.css'

const ChangeContactNumberPassword = (props) => {
    const { user, onAuthenticatedUser } = props
    const { notify } = useNotistack()
    const { loginUser, isLoading } = useLogin()

    console.log(user);

    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useValidate(
        (value) => value.trim() !== ''
        // && value.includes(".com")
    )

    let formIsValid = false

    if (enteredPasswordIsValid) {
        formIsValid = true
    }

    const submitHandler = async () => {
        if (!formIsValid) {
            return
        }

        try {
            const res = await loginUser({
                email: email,
                password: enteredPassword,
            });

            console.log(res);
            onAuthenticatedUser();
            if (res.user === null) {
                notify('Incorrect password', 'error')
            }
        } catch(err) {}

        onAuthenticatedUser()
    }

    return (
        <div className={`${styles['change-number-row']}`}>
            <div className={`${styles['enter-number']} `}>
                <TextFieldAdornedPassword
                    label="Password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    helperText={
                        enteredPasswordHasError && 'Enter a valid password.'
                    }
                />
            </div>

            <PrimaryButton
                width="100%"
                onClick={submitHandler}
                isLoading={isLoading}
                loadingText="SUBMIT"
            >
                SUBMIT
            </PrimaryButton>
        </div>
    )
}

export default ChangeContactNumberPassword

// ChangeContactNumberPassword
