import * as React from 'react'
import { Link } from 'react-router-dom'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector'

import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import AmenitiesForm from './AmenitiesForm'
import BasicDetailsForm from './BasicDetailsForm'
import InclusionsForm from './InclusionsForm'
import FacilitiesForm from './FacilitiesForm'
import RulesForm from './RulesForm'
import GenderForm from './GenderForm'
import SlotsForm from './SlotsForm'
import PricingForm from './PricingForm'
import UploadImageForm from './UploadImageForm'
import CreateUnitContext from '../../../../context/create-unit-context'

import styles from './CreateUnit.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { BsCheckLg } from 'react-icons/bs'

import Check from '@mui/icons-material/Check'
import LocationForm from './LocationForm'
import PrimaryButton from '../../../../components/Button/PrimaryButton'

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

export default function CreateUnitForm() {
    const createUnitCtx = React.useContext(CreateUnitContext);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const steps = [
        {
            label: 'BASIC DETAILS',
            description: <BasicDetailsForm onNext={handleNext} />,
        },
        {
            label: 'AMENITIES',
            description: (
                <AmenitiesForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: 'INCLUSIONS',
            description: (
                <InclusionsForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: 'FACILITIES',
            description: (
                <FacilitiesForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: 'RULES',
            description: <RulesForm onBack={handleBack} onNext={handleNext} />,
        },
        {
            label: 'GENDER',
            description: <GenderForm onBack={handleBack} onNext={handleNext} />,
        },
        {
            label: 'SLOTS',
            description: <SlotsForm onBack={handleBack} onNext={handleNext} />,
        },
        {
            label: 'PRICE',
            description: (
                <PricingForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: 'LOCATION',
            description: (
                <LocationForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: 'UPLOAD IMAGES',
            description: (
                <UploadImageForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        // {
        //     label: "COMPLETE",
        //     description: <CompleteCreateUnit onNext={hand}/>,
        // },
    ]

    const [activeStep, setActiveStep] = React.useState(0)

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <div className={`${styles['create-unit-form-container']}`}>
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                connector={<QontoConnector />}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            className={styles['step-label']}
                            StepIconComponent={QontoStepIcon}
                        >
                            <p className="pre-title">{step.label}</p>
                        </StepLabel>
                        <StepContent
                            sx={{
                                marginLeft: '16px',
                                borderWidth: '2px',
                                borderColor: 'var(--border-color)',
                            }}
                        >
                            {step.description}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <div className={`${styles['create-unit-complete']}`}>
                        <div
                            className={`${styles['create-unit-complete-container']}`}
                        >
                            <CheckCircleIcon
                                style={{
                                    fill: 'var(--accent)',
                                    fontSize: '62px',
                                }}
                            />

                            <div className={`${styles['success-content']}`}>
                                <h2>Success</h2>
                                <div
                                    className={`${styles['success-content-message']}`}
                                >
                                    Your new unit will undergo a verification
                                    process to ensure that it meets our quality
                                    standards. We kindly ask for your patience
                                    and understanding as this may take some
                                    time. Rest assured that we will keep you
                                    updated on the progress and will do our best
                                    to speed up the process.
                                </div>
                            </div>
                        </div>

                        <div>
                            <PrimaryButton>
                                <Link style={{ color: 'white' }}>
                                    Go back to profile
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                </Paper>
            )}
        </div>
    )
}
