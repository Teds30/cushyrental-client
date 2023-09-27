import React, { Fragment, useEffect, useState } from 'react'

import useHttp from '../../../hooks/http-hook'

import styles from './PersonalInformation.module.css'
import TextField from '../../../components/TextField/TextField'

import useValidate from '../../../hooks/validate-input-hook'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import BorderedButton from '../../../components/Button/BorderedButton'
import { BsArrowRight } from 'react-icons/bs'
import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'

const PersonalInformation = (props) => {
    const { form, setForm, handleNext, handleBack } = props

    const userId = 1
    const { sendRequest } = useHttp()
    const [initialSelect, setInitialSelect] = useState(form.selectedUnit)

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useValidate((value) => value.trim() !== '')
    const {
        value: enteredAccnum,
        isValid: enteredAccnumIsValid,
        hasError: enteredAccnumHasError,
        valueChangeHandler: accnumChangeHandler,
        inputBlurHandler: accnumBlurHandler,
        reset: accnumReset,
    } = useValidate((value) => value.trim() !== '')
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useValidate((value) => value.includes('@'))

    const [open, setOpen] = useState(!!!form.selectedUnit.unitId)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setOpen(false)
    }

    const [units, setUnits] = useState([])

    useEffect(() => {
        const loadUnits = async () => {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/user_units/${userId}`,
            })

            setUnits(res.filter((unit) => unit.request_status === 1))
        }
        loadUnits()
    }, [])

    const isValid =
        !!form.selectedUnit.unitId &&
        !!form.gcash_name &&
        !!form.gcash_account &&
        !!form.email_address

    return (
        <div className={styles['container']}>
            <p style={{ textAlign: 'center' }}>
                Once you have completed the payment, please fill out the
                following information for verification:
            </p>
            <div className={styles['card-container']}>
                <div className={styles['card']}>
                    <div className={styles['form-container']}>
                        <div className={styles['promoting-unit']}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p className="title">Promote unit</p>
                                {form.selectedUnit.unitId && (
                                    <p
                                        className="title"
                                        style={{ color: 'var(--accent)' }}
                                        onClick={() => {
                                            setOpen(true)
                                        }}
                                    >
                                        Change
                                    </p>
                                )}
                            </div>
                            {form.selectedUnit.unitId ? (
                                <div className={styles['preview-chosen-unit']}>
                                    <div className={styles['unit-picture']}>
                                        <img src="" alt="" />
                                    </div>
                                    <div className={styles['unit-details']}>
                                        <p className="title">
                                            {form.selectedUnit.unitName}
                                        </p>
                                        <p className="caption">
                                            {form.selectedUnit.unitAddress}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <BorderedButton
                                    width="100%"
                                    onClick={() => {
                                        setOpen(true)
                                    }}
                                >
                                    Choose a unit
                                </BorderedButton>
                            )}
                        </div>
                        <h3 style={{ textAlign: 'center' }}>
                            User Information
                        </h3>
                        <TextField
                            fullWidth
                            label="Gcash Account Full Name"
                            defaultValue={form.gcash_name}
                            onChange={(e) => {
                                nameChangeHandler(e)
                                setForm((prev) => {
                                    return {
                                        ...prev,
                                        gcash_name: e.target.value,
                                    }
                                })
                            }}
                            onBlur={nameBlurHandler}
                            helperText={
                                enteredNameHasError &&
                                'Please enter your GCash account name.'
                            }
                            error
                            required
                        />
                        <TextField
                            fullWidth
                            label="GCash Account Number"
                            defaultValue={form.gcash_account}
                            onChange={(e) => {
                                accnumChangeHandler(e)
                                setForm((prev) => {
                                    return {
                                        ...prev,
                                        gcash_account: e.target.value,
                                    }
                                })
                            }}
                            onBlur={accnumBlurHandler}
                            helperText={
                                enteredAccnumHasError &&
                                'Please enter your GCash account number.'
                            }
                            error
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            defaultValue={form.email_address}
                            onChange={(e) => {
                                emailChangeHandler(e)
                                setForm((prev) => {
                                    return {
                                        ...prev,
                                        email_address: e.target.value,
                                    }
                                })
                            }}
                            onBlur={emailBlurHandler}
                            helperText={
                                enteredEmailHasError &&
                                'Please enter your valid email address.'
                            }
                            error
                            required
                        />
                    </div>
                    <p>
                        Please ensure that all the information provided is
                        accurate and up-to-date to avoid any issues with your
                        subscription
                    </p>
                </div>
            </div>
            <SwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
            >
                <div className={styles['swipeable-edge-content']}>
                    <div className={styles['main-content']}>
                        <p className="title">Promote unit</p>
                        <div className={styles['units-container']}>
                            {units.map((unit) => {
                                const unitStyles =
                                    initialSelect.unitId === unit.id
                                        ? `${styles['unit']} ${styles['unit-selected']}`
                                        : `${styles['unit']}`
                                return (
                                    <div
                                        className={unitStyles}
                                        key={unit.id}
                                        onClick={() => {
                                            setInitialSelect({
                                                unitId: unit.id,
                                                unitName: unit.name,
                                                unitAddress: unit.address,
                                            })
                                        }}
                                    >
                                        <div className={styles['unit-picture']}>
                                            <img src="" alt="" />
                                        </div>
                                        <div className={styles['unit-details']}>
                                            <p className="title">{unit.name}</p>
                                            <p className="caption">
                                                {unit.address}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles['action']}>
                        <PrimaryButton
                            width="100%"
                            disabled={!initialSelect.unitId}
                            onClick={() => {
                                handleCloseDrawer()
                                setForm((prev) => {
                                    return {
                                        ...prev,
                                        selectedUnit: initialSelect,
                                    }
                                })
                            }}
                        >
                            Choose
                        </PrimaryButton>
                    </div>
                </div>
            </SwipeableCard>
            <div className={styles['actions']}>
                {/* <BorderlessButton onClick={handleBack}>Back</BorderlessButton> */}
                <PrimaryButton
                    width="100%"
                    rightIcon={<BsArrowRight strokeWidth={1} />}
                    onClick={handleNext}
                    disabled={!isValid}
                >
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}

export default PersonalInformation
