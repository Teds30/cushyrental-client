import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import moment from 'moment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import styles from './Expenditures.module.css'
import ComparisonToolContext from '../../../context/comparison-tool-context'
import SecondaryButton from '../../../components/Button/SecondaryButton'

const EstimatedStay = (props) => {
    const cctool = useContext(ComparisonToolContext)
    const { handleMonthsList, selectedDates, handleSelectDates } = cctool

    const handleSaveDates = useCallback(() => {
        const fromDate = dayjs(selectedDates.from)
        const toDate = dayjs(selectedDates.to)

        const months = []
        let current = fromDate
        let idCounter = 0 // Initialize a counter for IDs

        while (current.isBefore(toDate) || current.isSame(toDate, 'month')) {
            months.push({
                id: idCounter,
                year: current.format('YYYY'),
                month: current.format('MM'),
            })
            current = current.add(1, 'month')
            idCounter++ // Increment the ID counter
        }

        handleMonthsList(months)
    }, [selectedDates])

    return (
        <div className={styles['input-container']}>
            <p className="title">Estimated Stay</p>
            <div className={styles['date-selector-container']}>
                <div className={styles['datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={'Date'}
                            views={['month', 'year']}
                            defaultValue={
                                selectedDates.from
                                    ? dayjs(selectedDates.from)
                                    : dayjs()
                            }
                            min
                            onChange={(newValue) => {
                                handleSelectDates({
                                    from: newValue.format('MM/DD/YYYY'),
                                })
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div className={styles['separator']}>TO</div>
                <div className={styles['datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={'Date'}
                            views={['month', 'year']}
                            minDate={dayjs(selectedDates.from)}
                            defaultValue={
                                selectedDates.to
                                    ? dayjs(selectedDates.to)
                                    : dayjs()
                            }
                            onChange={(newValue) => {
                                handleSelectDates({
                                    to: newValue.format('MM/DD/YYYY'),
                                })
                            }}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <SecondaryButton onClick={handleSaveDates}>
                Save Date
            </SecondaryButton>
        </div>
    )
}

export default EstimatedStay
