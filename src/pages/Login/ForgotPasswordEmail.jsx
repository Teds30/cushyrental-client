import TextField from '../../components/TextField/TextField'
import useValidate from '../../hooks/validate-input-hook'
import PrimaryButton from '../../components/Button/PrimaryButton'
import useUserManager from '../../hooks/data/users-hook'
import useNotistack from '../../hooks/notistack-hook'

import styles from './ForgotPassword.module.css'

const ForgotPasswordEmail = (props) => {
    const { onEmail, onReset } = props
    const { notify } = useNotistack()

    const { fetchEmail, isLoading } = useUserManager()
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useValidate(
        (value) => value.trim() !== '' && value.includes('@')
        // && value.includes(".com")
    )

    let formIsValid = false

    if (enteredEmailIsValid) {
        formIsValid = true
    }

    const submitHandler = async () => {
        if (!formIsValid) {
            return
        }

        try {
            const res = await fetchEmail(enteredEmail)
            if (res.length === 0) {
                notify('Email not registered!', 'info')
            } else {
                onEmail(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${styles['forgot-password-email-row']}`}>
            {/* <div>
                <h2>Forgot Password?</h2>
                <p>Enter your email, and we will send you a code to reset your password.</p>
            </div> */}
            <div className={`${styles['enter-email']} `}>
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    helperText={
                        enteredEmailHasError && 'Please enter your email.'
                    }
                    error
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

export default ForgotPasswordEmail
