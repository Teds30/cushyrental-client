import * as React from "react";
import { Link } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AmenitiesForm from "./AmenitiesForm";
import BasicDetailsForm from "./BasicDetailsForm";
import InclusionsForm from "./InclusionsForm";
import FacilitiesForm from "./FacilitiesForm";
import RulesForm from "./RulesForm";
import GenderForm from "./GenderForm";
import SlotsForm from "./SlotsForm";
import PricingForm from "./PricingForm";
import UploadImageForm from "./UploadImageForm";

import styles from "./CreateUnit.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationForm from "./LocationForm";
import PrimaryButton from "../../../../components/Button/PrimaryButton";

export default function CreateUnitForm() {
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = [
        {
            label: "BASIC DETAILS",
            description: <BasicDetailsForm onNext={handleNext} />,
        },
        {
            label: "AMENITIES",
            description: (
                <AmenitiesForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: "INCLUSIONS",
            description: (
                <InclusionsForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: "FACILITIES",
            description: (
                <FacilitiesForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: "RULES",
            description: <RulesForm onBack={handleBack} onNext={handleNext} />,
        },
        {
            label: "GENDER",
            description: (
                <GenderForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: "SLOTS",
            description: <SlotsForm onBack={handleBack} onNext={handleNext} />,
        },
        {
            label: "PRICE",
            description: (
                <PricingForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: "LOCATION",
            description: (
                <LocationForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        {
            label: "UPLOAD IMAGES",
            description: (
                <UploadImageForm onBack={handleBack} onNext={handleNext} />
            ),
        },
        // {
        //     label: "COMPLETE",
        //     description: <CompleteCreateUnit onNext={hand}/>,
        // },
    ];

    const [activeStep, setActiveStep] = React.useState(0);

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={`${styles["create-unit-form-container"]}`}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel className="pre-title">{step.label}</StepLabel>
                        <StepContent>{step.description}</StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <div className={`${styles["create-unit-complete"]}`}>
                        <div
                            className={`${styles["create-unit-complete-container"]}`}
                        >
                            <CheckCircleIcon
                                style={{
                                    fill: "var(--accent)",
                                    fontSize: "62px",
                                }}
                            />

                            <div className={`${styles["success-content"]}`}>
                                <h2>Success</h2>
                                <div
                                    className={`${styles["success-content-message"]}`}
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
                                <Link style={{ color: "white" }}>
                                    Go back to profile
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                </Paper>
            )}
        </div>
    );
}
