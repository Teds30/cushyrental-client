import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import PersonalInformation from "./PersonalInformation";

import styles from './AccountVerification.module.css';
import CardInformation from "./CardInformation";
import PrivacyAndAgreement from "./PrivacyAndAgreement";
import SuccessVerification from "./SuccessModal/SuccessVerification";

export default function AccountVerificationProcess(props) {

    const [activeStep, setActiveStep] = React.useState(0);
    const [ showSubmit, setShowSubmit ] = React.useState();
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        if (activeStep + 1 === steps.length) {
            setShowSubmit(true);
            return;
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        
        // setSkipped(newSkipped);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {
    //         // You probably want to guard against something like this,
    //         // it should never occur unless someone's actively trying to break something.
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        {
            verificationForm: <PersonalInformation onNext={handleNext}/>
        }
        ,{
            verificationForm: <CardInformation onNext={handleNext}/>
        }
        ,{
            verificationForm: <PrivacyAndAgreement onNext={handleNext}/>
        }
    ];

    return (
        <Box sx={{ width: "100%", marginTop: '11px' }}>
            {showSubmit && <SuccessVerification openModal={showSubmit}/>}
            <Stepper sx={{padding: '0 40px'}} activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={index}>
                            <StepLabel></StepLabel>
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

                    <div className={`${styles['verification-form-main']}`}>
                        {steps[activeStep].verificationForm}
                    </div>
                    
                    <Box sx={{ display: "flex", flexDirection: "row", padding: '16px' }}>
                        {/* <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} /> */}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
