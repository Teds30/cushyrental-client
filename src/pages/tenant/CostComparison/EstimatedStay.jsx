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
import PrimaryButton from '../../../components/Button/PrimaryButton'
import SecondaryButton from '../../../components/Button/SecondaryButton'

const EstimatedStay = (props) => {
    const cctool = useContext(ComparisonToolContext)
    const {
        monthsList,
        handleMonthsList,
        selectedDates,
        handleSelectDates,
        handleSaveDates,
    } = cctool

    return (
        <div className={styles['input-container']}>
            <p className="title">Estimated Stay</p>
            <div className={styles['date-selector-container']}>
                <div className={styles['datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={'Start of stay'}
                            views={['month', 'year']}
                            defaultValue={
                                selectedDates.from
                                    ? dayjs(selectedDates.from)
                                    : dayjs()
                            }
                            minDate={dayjs()}
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
                            label={'End of stay'}
                            views={['month', 'year']}
                            minDate={dayjs(selectedDates.from)}
                            // defaultValue={
                            //     selectedDates.to
                            //         ? dayjs(selectedDates.to)
                            //         : dayjs()
                            // }
                            onChange={(newValue) => {
                                handleSelectDates({
                                    to: newValue.format('MM/DD/YYYY'),
                                })
                            }}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            {monthsList.length > 0 ? (
                <SecondaryButton onClick={handleSaveDates}>
                    Save Date
                </SecondaryButton>
            ) : (
                <PrimaryButton onClick={handleSaveDates}>
                    Save Date
                </PrimaryButton>
            )}
        </div>
    )
}

export default EstimatedStay
