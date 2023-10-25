import React, { useEffect, useState } from 'react'

import styles from './AvailSubscription.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {
    IconButton,
    Step,
    StepContent,
    StepLabel,
    Stepper,
} from '@mui/material'

import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector'

import { styled } from '@mui/material/styles'
import { FiChevronLeft } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import PaymentScan from './PaymentScan'
import PersonalInformation from './PersonalInformation'
import PaymentProof from './PaymentProof'
import Submitted from './Submitted'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'var(--border-color)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'var(--border-color)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        marginLeft: '4px',
        borderWidth: 2,
        zIndex: 100,
        position: 'relative',
        borderColor: 'var(--border-color)',
    },
}))

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: 'var(--border-color)',
    }),
}))

function QontoStepIcon(props) {
    const { active, completed, className, icon } = props

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <div className={styles['step-container-completed']}>
                    <BsCheckLg size={16} />
                </div>
            ) : active ? (
                <div className={styles['step-container']}>{icon}</div>
            ) : (
                <div className={styles['step-container-inactive']}>{icon}</div>
            )}
        </QontoStepIconRoot>
    )
}

const AvailSubscription = () => {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const [form, setForm] = useState({
        gcash_name: '',
        gcash_account: '',
        email_address: '',
        uploadedProof: null,
        selectedUnit: {
            unitId: null,
            unitName: '',
            unitAddress: '',
        },
    })

    const [stepValid, setStepValid] = useState({ step1: false, step2: false })

    useEffect(() => {
        const res =
            !!form.gcash_name &&
            !!form.gcash_account &&
            !!form.email_address &&
            !!form.selectedUnit.unitId
        setStepValid((prev) => {
            return { ...prev, step1: res }
        })
    }, [
        form.gcash_name,
        form.gcash_account,
        form.email_address,
        form.selectedUnit,
    ])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const steps = [
        {
            label: 'QR Code',
        },
        {
            label: 'Personal Information',
        },
        {
            label: 'Proof of Payment',
        },
    ]

    return (
        <div className={styles['container']}>
            <div className={styles['nav-container']}>
                <Link
                    to="/myunit-landlord"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate(-1)
                    }}
                    className={`${styles['link-button']}`}
                >
                    <IconButton size="large" color="inherit" aria-label="menu">
                        <FiChevronLeft
                            style={{
                                color: '#fff',
                                fill: 'transparent',
                            }}
                        />
                    </IconButton>
                </Link>
                Subscription
            </div>
            <div className={styles['content-container']}>
                <Stepper
                    activeStep={activeStep}
                    orientation="horizontal"
                    connector={<QontoConnector />}
                    className={styles['main-stepper']}
                >
                    {steps.map((step, index) => (
                        <Step key={index} className={styles['step-box']}>
                            {activeStep === index && (
                                <div className={styles['step']}></div>
                            )}
                            <StepLabel
                                className={styles['step-label']}
                                StepIconComponent={QontoStepIcon}
                            >
                                {/* <p className="pre-title">{step.label}</p> */}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className={styles['content']}>
                    {activeStep === 0 && (
                        <div>
                            <PersonalInformation
                                form={form}
                                setForm={setForm}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                        </div>
                    )}
                    {activeStep === 1 && (
                        <div>
                            <PaymentScan
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                        </div>
                    )}
                    {activeStep === 2 && (
                        <div>
                            <PaymentProof
                                form={form}
                                setForm={setForm}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                        </div>
                    )}
                    {activeStep === steps.length && <Submitted />}
                </div>
            </div>
        </div>
    )
}

export default AvailSubscription
