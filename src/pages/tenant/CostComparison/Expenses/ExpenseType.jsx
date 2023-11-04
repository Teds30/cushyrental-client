import React, { useContext, useState } from 'react'

import { Menu, MenuItem } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import SelectChips from '../Inputs/SelectChips'
import SelectChipsMonths from '../Inputs/SelectChipsMonths'

import { FiChevronLeft, FiAlertCircle } from 'react-icons/fi'
import { TbChevronDown } from 'react-icons/tb'

import styles from '../Expenditures.module.css'
import ComparisonToolContext from '../../../../context/comparison-tool-context'

const daysList = [
    {
        id: 0,
        name: 'Monday',
    },
    {
        id: 1,
        name: 'Tuesday',
    },
    {
        id: 2,
        name: 'Wednesday',
    },
    {
        id: 3,
        name: 'Thursday',
    },
    {
        id: 4,
        name: 'Friday',
    },
    {
        id: 5,
        name: 'Saturday',
    },
    {
        id: 6,
        name: 'Sunday',
    },
]

const ExpenseType = (props) => {
    const { expense } = props
    const {
        id,
        name,
        expenses,
        dateType,
        months,
        filterChecked,
        weekOfDays,
        selectAllMonths,
    } = expense

    const cctool = useContext(ComparisonToolContext)
    const {
        monthsList,
        monthsListDisplay,
        handleExpenses,
        handleMonths,
        handleWeekOfDay,
        handleDateType,
        handleFilterChange,
        handleRemoveCategory,
        handleSelectAllMonths,
    } = cctool

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={styles['input-container']}>
            <div className={styles['input-name-container']}>
                <p>{name}</p>

                {id !== 1 && (
                    <span
                        onClick={() => {
                            handleRemoveCategory(id)
                        }}
                    >
                        Remove
                    </span>
                )}
            </div>
            <div className={styles['expense-card']}>
                <div className={styles['expense-input-container']}>
                    <span className={styles['adornment']}>PHP</span>
                    <input
                        type="number"
                        inputMode="decimal"
                        className={styles['expense-input']}
                        value={expenses}
                        onChange={(event) => handleExpenses(event, id)}
                    />
                    <div
                        onClick={handleClick}
                        className={styles['flat-dropdown']}
                        style={{
                            fontWeight: '700',
                        }}
                    >
                        {dateType === 0 ? '/day' : '/month'}
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TbChevronDown
                                size={'18px'}
                                style={{ fill: 'transparent' }}
                            />
                        </span>
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleDateType(id, 0)
                                handleClose()
                            }}
                        >
                            day
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleDateType(id, 1)
                                handleClose()
                            }}
                        >
                            month
                        </MenuItem>
                    </Menu>
                </div>

                {(dateType === 0 || dateType === 1) && (
                    <div className={styles['months-container']}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            border: 'var(--accent)',
                                            color: 'var(--accent)',
                                            '&.Mui-checked': {
                                                color: 'var(--accent)',
                                            },
                                            '&:hover': {
                                                color: 'var(--accent)',
                                            },
                                        }}
                                        checked={
                                            months.length === monthsList.length
                                        }
                                        onChange={(event) =>
                                            handleSelectAllMonths(event, id)
                                        }
                                    />
                                }
                                label="Apply to all months"
                            />
                        </FormGroup>
                        {monthsListDisplay &&
                            monthsListDisplay.map((month, index) => {
                                return (
                                    <div key={index}>
                                        <div className="title">
                                            {month[0].year}
                                        </div>
                                        <div
                                            className={
                                                styles['chips-container']
                                            }
                                        >
                                            <SelectChipsMonths
                                                keyIndex={index}
                                                items={month}
                                                button="checkbox"
                                                selected={months}
                                                expenseId={id}
                                                onChipValue={handleMonths}
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                        {dateType === 0 && monthsListDisplay && (
                            <div className={styles['week-contain']}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filterChecked}
                                                onChange={(event) =>
                                                    handleFilterChange(
                                                        event,
                                                        id
                                                    )
                                                }
                                            />
                                        }
                                        label="Filter day of the week"
                                    />
                                </FormGroup>
                                {filterChecked && (
                                    <div className={styles['chips-container']}>
                                        <SelectChips
                                            items={daysList}
                                            button="checkbox"
                                            selected={weekOfDays}
                                            expenseId={id}
                                            onChipValue={handleWeekOfDay}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpenseType
