import React, { useEffect, useRef, useState } from 'react'

import moment from 'moment'

import dayjs from 'dayjs'

const ComparisonToolContext = React.createContext({
    selectedUnits: [],
    expensesInput: [],
    selectedDates: {},
    monthsList: [],
    monthsListDisplay: [],
    total: 0,
    handleMonths: () => {},
    handleWeekOfDay: () => {},
    countDaysWithWeekday: () => {},
    handleMonthsList: () => {},
    handleTotal: () => {},
    handleDateType: () => {},
    handleExpenses: () => {},
    handleSelectDates: () => {},
    handleFilterChange: () => {},
    handleExpenseTotal: () => {},
    handleNewCategory: () => {},
    handleRemoveCategory: () => {},
    handleSelectAllMonths: () => {},
    handleSelectUnits: () => {},
})

export const ComparisonToolContextProvider = (props) => {
    const [expensesInput, setExpensesInput] = useState([
        {
            id: 1,
            name: 'Transportation',
            expenses: 0,
            dateType: 1,
            months: [],
            monthsList: [],
            monthsListDisplay: [],
            weekOfDays: [0, 1, 2, 3, 4, 5, 6],
            filterChecked: true,
            // selectAllMonths: true,
            total: 0,
        },
        // {
        //     id: 2,
        //     name: 'Snacks',
        //     expenses: 0,
        //     dateType: 1,
        //     months: [],
        //     monthsList: [],
        //     monthsListDisplay: [],
        //     weekOfDays: [0, 1, 2, 3, 4, 5, 6],
        //     filterChecked: true,
        //     total: 0,
        // },
    ])
    const [selectedUnits, setSelectedUnits] = useState([])
    const [monthsList, setMonthsList] = useState([])
    const [monthsListDisplay, setMonthsListDisplay] = useState([])
    const [total, setTotal] = useState(0)
    const [selectedDates, setSelectedDates] = useState({
        from: dayjs(),
        to: dayjs(),
    })

    const handleSelectUnits = (savedUnits) => {
        setSelectedUnits(savedUnits)
    }

    const handleNewCategory = (name) => {
        const data = {
            expenses: 0,
            dateType: 1,
            months: [],
            monthsList: [],
            monthsListDisplay: [],
            weekOfDays: [0, 1, 2, 3, 4, 5, 6],
            filterChecked: true,
            total: 0,
        }
        setExpensesInput((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            const newItem = {
                id: newId,
                name: name,
                expenses: 0,
                dateType: 1,
                months: [],
                monthsList: [],
                monthsListDisplay: [],
                weekOfDays: [0, 1, 2, 3, 4, 5, 6],
                filterChecked: true,
                total: 0,
            }
            return [...prev, newItem]
        })
    }

    const handleRemoveCategory = (id) => {
        setExpensesInput((prev) =>
            prev.filter((expenseItem) => expenseItem.id !== id)
        )
    }

    const handleFilterChange = (event, id) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id
                    ? { ...expenseItem, filterChecked: event.target.checked }
                    : expenseItem
            )
        )
    }

    const handleSelectDates = (date) => {
        setSelectedDates((prev) => {
            return {
                ...prev,
                ...date,
            }
        })
    }

    const handleExpenses = (event, id) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id
                    ? { ...expenseItem, expenses: event.target.value }
                    : expenseItem
            )
        )
    }

    const handleMonths = (id, value) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id
                    ? { ...expenseItem, months: value }
                    : expenseItem
            )
        )
    }

    const handleWeekOfDay = (id, value) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id
                    ? { ...expenseItem, weekOfDays: value }
                    : expenseItem
            )
        )
    }

    const handleExpenseTotal = (id, value) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id
                    ? { ...expenseItem, total: value }
                    : expenseItem
            )
        )
    }

    const handleTotal = (value) => {
        setTotal(value)
    }

    const handleDateType = (id, value) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id
                    ? { ...expenseItem, dateType: value }
                    : expenseItem
            )
        )
    }

    const handleMonthsList = (months) => {
        setMonthsList(months)
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.selectAllMonths
                    ? { ...expenseItem, months: months }
                    : expenseItem
            )
        )
    }

    const handleSelectAllMonths = (event, id) => {
        setExpensesInput((prevState) =>
            prevState.map((expenseItem) =>
                expenseItem.id === id && event.target.checked
                    ? { ...expenseItem, months: monthsList }
                    : expenseItem
            )
        )
    }

    function countDaysWithWeekday(month, weekOfDays) {
        // Create a Moment.js object for the first day of the given month
        const firstDayOfMonth = moment(
            `${month.year}-${month.month}-01`,
            'YYYY-MM-DD'
        )

        // Create an array to hold the matching days
        let matchingDays = 0

        // Loop through each day of the month
        for (let day = 1; day <= firstDayOfMonth.daysInMonth(); day++) {
            const currentDay = firstDayOfMonth.clone().date(day)
            const weekday = currentDay.day() // 0 = Sunday, 1 = Monday, ...

            // Check if the weekday is in the weekOfDays array
            if (weekOfDays.includes(weekday)) {
                // matchingDays.push(currentDay.format('YYYY-MM-DD'))
                matchingDays++
            }
        }

        return matchingDays
    }

    useEffect(() => {
        const newList = [...monthsList]
        const result = Object.values(
            newList.reduce((acc, x) => {
                acc[x.year] = [...(acc[x.year] || []), x]
                return acc
            }, {})
        )
        setMonthsListDisplay(result)
    }, [monthsList])

    return (
        <ComparisonToolContext.Provider
            value={{
                selectedUnits: selectedUnits,
                handleSelectUnits: handleSelectUnits,
                monthsList: monthsList,
                expensesInput: expensesInput,
                selectedDates: selectedDates,
                monthsListDisplay: monthsListDisplay,
                total: total,
                handleMonths: handleMonths,
                handleWeekOfDay: handleWeekOfDay,
                countDaysWithWeekday: countDaysWithWeekday,
                handleMonthsList: handleMonthsList,
                handleTotal: handleTotal,
                handleExpenses: handleExpenses,
                handleDateType: handleDateType,
                handleSelectDates: handleSelectDates,
                handleFilterChange: handleFilterChange,
                handleExpenseTotal: handleExpenseTotal,
                handleNewCategory: handleNewCategory,
                handleRemoveCategory: handleRemoveCategory,
                handleSelectAllMonths: handleSelectAllMonths,
            }}
        >
            {props.children}
        </ComparisonToolContext.Provider>
    )
}

export default ComparisonToolContext
