import * as React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { BsCheckLg } from "react-icons/bs";
import Box from "@mui/material/Box";

import PersonalInformation from "./PersonalInformation";

import styles from "./AccountVerification.module.css";
import CardInformation from "./CardInformation";
import PrivacyAndAgreement from "./PrivacyAndAgreement";
import SuccessVerification from "./SuccessModal/SuccessVerification";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "var(--accent)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "var(--accent)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        marginLeft: "4px",
        borderWidth: 2,
        zIndex: 100,
        position: "relative",
        borderColor: "var(--accent)",
        with: ''
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "var(--border-color)",
    }),
}));

function QontoStepIcon(props) {
    const { active, completed, className, icon } = props;

    console.log("Hello John C. Otilla");

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <div className={styles["step-container-completed"]}>
                    <BsCheckLg size={16} />
                </div>
            ) : active ? (
                <div className={styles["step-container"]}>{icon}</div>
            ) : (
                <div className={styles["step-container-inactive"]}>{icon}</div>
            )}
        </QontoStepIconRoot>
    );
}

export default function AccountVerificationProcess(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showSubmit, setShowSubmit] = React.useState();
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (activeStep + 1 === steps.length) {
            setShowSubmit(true);
            return;
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        {
            verificationForm: <PersonalInformation onNext={handleNext} />,
        },
        {
            verificationForm: <CardInformation onNext={handleNext} />,
        },
        {
            verificationForm: <PrivacyAndAgreement onNext={handleNext} />,
        },
    ];

    return (
        <Box sx={{ width: "100%", marginTop: "11px" }}>
            {showSubmit && <SuccessVerification openModal={showSubmit} />}
            <Stepper
                sx={{ padding: "0 40px" }}
                activeStep={activeStep}
                orientation="horizontal"
                connector={<QontoConnector />}
            >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={index} className={styles['step-box']}>
                            {activeStep === index && (
                                <div className={styles['step']}></div>
                            )}
                            <StepLabel
                                StepIconComponent={QontoStepIcon}
                                className={styles["step-label"]}
                            ></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className={`${styles["verification-form-main"]}`}>
                        {steps[activeStep].verificationForm}
                    </div>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "16px",
                        }}
                    ></Box>
                </React.Fragment>
            )}
        </Box>
    );
}
