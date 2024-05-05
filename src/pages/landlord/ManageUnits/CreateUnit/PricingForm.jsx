import { useContext, useState } from 'react'

import TextField from '../../../../components/TextField/TextField'
import BorderlessButton from '../../../../components/Button/BorderlessButton'
import PrimaryButton from '../../../../components/Button/PrimaryButton'
import CreateUnitContext from '../../../../context/create-unit-context'
import useValidate from '../../../../hooks/validate-input-hook'
import Quantity from '../../../../components/Quantity/Quantity'

import styles from './CreateUnit.module.css'
import EastIcon from '@mui/icons-material/East'

const PricingForm = (props) => {
    const createUnitCtx = useContext(CreateUnitContext)
    const pricingDetails = createUnitCtx.unitData

    const { onNext, onBack } = props

    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: enteredPriceHasError,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        reset: priceReset,
    } = useValidate((value) => value.trim() !== '' && value !== 0)

    const [monthlyDeposit, setMonthlyDeposit] = useState(
        pricingDetails.month_deposit ? pricingDetails.month_deposit : 0
    )
    const [monthlyAdvancePayment, setMonthlyAdvancePayment] = useState(
        pricingDetails.month_advance ? pricingDetails.month_advance : 0
    )

    let formIsValid = false

    if (enteredPriceIsValid) {
        formIsValid = true
    }

    const monthDepositHandler = (value) => {
        setMonthlyDeposit(value.value)
    }

    const monthAdvanceHandler = (value) => {
        setMonthlyAdvancePayment(value.value)
    }

    const draftPricing = () => {
        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                price: enteredPrice,
                month_deposit: monthlyDeposit,
                month_advance: monthlyAdvancePayment,
            })
        } else if (pricingDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                price: createUnitCtx.unitData.price,
                month_deposit: monthlyDeposit,
                month_advance: monthlyAdvancePayment,
            })
        }
    }

    const backHandler = (event) => {
        event.preventDefault()

        draftPricing()

        onBack()
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if (formIsValid) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                price: enteredPrice,
                month_deposit: monthlyDeposit,
                month_advance: monthlyAdvancePayment,
            })
        } else if (pricingDetails !== undefined) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                price: createUnitCtx.unitData.price,
                month_deposit: monthlyDeposit,
                month_advance: monthlyAdvancePayment,
            })
        } else {
            return
        }

        onNext()
    }

    return (
        <form
            className={`${styles['basic-details-form']}`}
            onSubmit={submitHandler}
        >
            <div className="title">Tell us about the price</div>

            <TextField
                fullWidth
                label="Price"
                type="number"
                defaultValue={
                    !enteredPrice ? pricingDetails.price : enteredPrice
                }
                onChange={priceChangeHandler}
                onBlur={priceBlurHandler}
                required
            />

            <div>
                <div className={`${styles.title}`}>
                    Do you require security deposit?
                </div>
                <div className="caption">
                    Leave 0 if you don’t require the tenant for security
                    deposits.
                </div>
            </div>

            <div>
                <div className="strong">MONTH/S OF DEPOSIT</div>
                <Quantity
                    onQuantity={monthDepositHandler}
                    setQuantityvalue={monthlyDeposit}
                    maxValue={5}
                />
            </div>

            <div>
                <div className="strong">MONTH/S OF ADVANCE PAYMENT</div>
                <Quantity
                    onQuantity={monthAdvanceHandler}
                    setQuantityvalue={monthlyAdvancePayment}
                    maxValue={5}
                />
            </div>

            <div className={`${styles['basic-details-button']}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton rightIcon={<EastIcon />}>Next</PrimaryButton>
            </div>
        </form>
    )
}

export default PricingForm
