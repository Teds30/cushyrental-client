import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import EstimatedStay from './EstimatedStay'

import BorderedButton from '../../../components/Button/BorderedButton'
import PrimaryButton from '../../../components/Button/PrimaryButton'

import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'

import { FiChevronLeft, FiAlertCircle } from 'react-icons/fi'

import styles from './Expenditures.module.css'
import ComparisonToolContext from '../../../context/comparison-tool-context'
import ExpenseType from './Expenses/ExpenseType'
import TextField from '../../../components/TextField/TextField'
import useValidate from '../../../hooks/validate-input-hook'

const Expenditures = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useValidate((value) => value.trim() !== '')

    const navigate = useNavigate()
    const cctool = useContext(ComparisonToolContext)
    const {
        expensesInput,
        countDaysWithWeekday,
        handleTotal,
        handleExpenseTotal,
        handleNewCategory,
        selectedDates,
        monthsList,
    } = cctool

    const [open, setOpen] = useState()

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setOpen(false)
    }

    const handleCompute = () => {
        let totalExpenses = 0

        expensesInput.map((expenseItem) => {
            const {
                id,
                expenses,
                months,
                filterChecked,
                dateType,
                weekOfDays,
            } = expenseItem

            if (expenses > 0) {
                let totalNumberOfDays = 0

                months.forEach((item) => {
                    const daysInMonth = moment(
                        item.year + '-' + item.month,
                        'YYYY-MM'
                    ).daysInMonth()
                    totalNumberOfDays += daysInMonth
                })

                let ctr = 0

                if (filterChecked) {
                    if (months[0]) {
                        const matchingDaysForMonth = months.map((month) => {
                            const matchingDays = countDaysWithWeekday(
                                month,
                                weekOfDays
                            )
                            ctr += matchingDays
                            return {
                                month: `${month.year}-${month.month}`,
                                matchingDays: matchingDays,
                            }
                        })
                    }
                }

                if (dateType === 0) {
                    if (filterChecked) {
                        totalExpenses += parseFloat(expenses) * ctr
                        handleExpenseTotal(id, parseFloat(expenses) * ctr)
                    } else {
                        totalExpenses +=
                            parseFloat(expenses) * totalNumberOfDays
                        handleExpenseTotal(
                            id,
                            parseFloat(expenses) * totalNumberOfDays
                        )
                    }
                } else if (dateType === 1) {
                    totalExpenses += parseFloat(expenses) * months.length
                    handleExpenseTotal(id, parseFloat(expenses) * months.length)
                }
            }
        })

        handleTotal(totalExpenses)

        navigate('/costcomparison')
    }

    const addCategory = () => {
        if (enteredName) {
            handleNewCategory(enteredName)
            setOpen(false)
            nameReset()
        }
    }

    return (
        <div className={styles['container']}>
            <Box className={`${styles['top-back-container']} `}>
                <AppBar
                    position="fixed"
                    sx={{
                        margin: 0,
                        backgroundColor: '#fff',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                        borderBottom: '1px solid var(--border-color)',
                    }}
                >
                    <Toolbar className={`${styles['toolbar-container']}`}>
                        <Link
                            to={`/`}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }}
                            className={`${styles['link-button']}`}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box
                            sx={{
                                marginLeft: '-24px',
                                display: 'flex',
                                justifyContent: 'center',
                                flex: '1',
                            }}
                        >
                            <p className="title">Expenditures</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={styles['content-container']}>
                <div className={styles['note']}>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <FiAlertCircle
                            size={'20px'}
                            style={{
                                fill: 'transparent',
                            }}
                        />
                    </span>
                    This feature will compute your costs associated with not
                    renting a boarding house.
                </div>

                <EstimatedStay />
                {selectedDates.from &&
                    selectedDates.to &&
                    monthsList.length > 0 && (
                        <>
                            <p
                                className="title"
                                style={{ alignSelf: 'flex-start' }}
                            >
                                Estimated Amount of Expenses
                            </p>

                            {expensesInput.map((expense, index) => {
                                return (
                                    <ExpenseType
                                        expense={expense}
                                        key={index}
                                    />
                                )
                            })}

                            <BorderedButton width="100%" onClick={toggleDrawer}>
                                Add a category
                            </BorderedButton>
                            <PrimaryButton width="100%" onClick={handleCompute}>
                                Compute
                            </PrimaryButton>
                        </>
                    )}

                <SwipeableCard
                    open={open}
                    onOpen={toggleDrawer}
                    closeDrawer={handleCloseDrawer}
                >
                    <div className={styles['new-expenses-container']}>
                        <p className="title">New expense category</p>
                        <TextField
                            fullWidth
                            label="Name"
                            defaultValue={''}
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            requiredhelperText={
                                enteredNameHasError &&
                                'Please enter your last name.'
                            }
                            error
                        />
                        <div style={{ marginTop: '24px' }}>
                            <PrimaryButton
                                width="100%"
                                onClick={addCategory}
                                disabled={!enteredNameIsValid}
                            >
                                Save category
                            </PrimaryButton>
                        </div>
                    </div>
                </SwipeableCard>
            </div>
        </div>
    )
}

export default Expenditures
