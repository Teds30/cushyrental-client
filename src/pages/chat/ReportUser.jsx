import React, { useEffect, useState } from 'react'

import {
    TbChevronRight,
    TbChevronLeft,
    TbSquareRoundedChevronLeftFilled,
} from 'react-icons/tb'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
} from '@mui/material'
import PrimaryButton from '../../components/Button/PrimaryButton'
import BorderedButton from '../../components/Button/BorderedButton'

import useUserReports from '../../hooks/data/user-reports-hook'

import styles from './ReportUser.module.css'

const reportTypes = [
    {
        id: 1,
        name: 'Scam',
        details: `The user has requested for a certain quantity of
        units. However, there has been no further update or
        communication regarding the matter. There may be
        several reasons provided by the user for the delay,
        or the user may have disappeared without any notice,
        leaving the unit availed unused. Moreover, it
        appears that the system has been utilized not in the
        appropriate manner, but rather for deceitful
        purposes.`,
    },
    {
        id: 2,
        name: 'Unrelated Uploads',
        details: `User posted irrelevant photo and is not related to
        rental of boarding house.`,
    },
    {
        id: 3,
        name: 'Irrelevant Reviews and Profanity',
        details: `The user submits reviews that include offensive
        language and irrelevant comments.`,
    },
]
const ReportUser = (props) => {
    const { reportingUser, reportedBy, handleCloseDrawer } = props

    const { isLoading, createUsersReport } = useUserReports()

    const [selected, setSelected] = useState([])
    const [isReported, setIsReported] = useState(false)

    const submitReport = async () => {
        const res = await createUsersReport({
            user_id: reportingUser,
            reported_by: reportedBy,
            reason: selected.join(', '),
        })

        setIsReported(true)
    }

    return (
        <div className={styles['container']}>
            {!isReported ? (
                <>
                    <p>
                        Reasons for report are based from the violations
                        provided below:
                    </p>
                    <div className={styles['reason-container']}>
                        {reportTypes.map((reportType, index) => (
                            <div className={styles['reason']} key={index}>
                                <p className="title">
                                    {`${reportType.name}. `}
                                    <span>{reportType.details}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className={styles['select-container']}>
                        <p className="title">
                            Select the violation that applies to your report.
                        </p>
                        <div className={styles['select']}>
                            <FormGroup>
                                {reportTypes.map((reportType, index) => (
                                    <FormControlLabel
                                        key={index}
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
                                                checked={selected.includes(
                                                    reportType.name
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selected.includes(
                                                            reportType.name
                                                        )
                                                    ) {
                                                        const newArr =
                                                            selected.filter(
                                                                (item) =>
                                                                    item !==
                                                                    reportType.name
                                                            )
                                                        setSelected(newArr)
                                                    } else {
                                                        setSelected((prev) => [
                                                            ...prev,
                                                            reportType.name,
                                                        ])
                                                    }
                                                }}
                                            />
                                        }
                                        label={reportType.name}
                                    />
                                ))}
                            </FormGroup>
                        </div>
                        <Box sx={{ marginTop: '14px' }}>
                            <PrimaryButton
                                width="100%"
                                btnType="danger"
                                onClick={submitReport}
                                disabled={selected.length === 0}
                                isLoading={isLoading}
                                loadingText="Reporting"
                            >
                                Report
                            </PrimaryButton>
                        </Box>
                    </div>
                </>
            ) : (
                <div className={styles['reported-container']}>
                    <div className={styles['reported-title']}>
                        <div className={styles['check']}>
                            <CheckCircleIcon
                                style={{
                                    fill: 'var(--accent)',
                                    fontSize: '48px',
                                }}
                            />
                        </div>

                        <p className="title">Report Submitted</p>
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        {' '}
                        Thank you for submitting a report. Your contribution is
                        greatly appreciated and helps us ensure a positive
                        experience for all users.
                    </p>
                    <Box sx={{ marginTop: '32px', width: '100%' }}>
                        <PrimaryButton width="100%" onClick={handleCloseDrawer}>
                            Done
                        </PrimaryButton>
                    </Box>
                </div>
            )}
        </div>
    )
}

export default ReportUser
