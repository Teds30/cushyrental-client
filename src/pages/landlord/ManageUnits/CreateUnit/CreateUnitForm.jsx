import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import AmenitiesForm from './AmenitiesForm';
import { styled } from '@mui/material/styles';

import BasicDetailsForm from './BasicDetailsForm';

import styles from './CreateUnit.module.css';

export default function CreateUnitForm() {
  const [ unitDetails, setUnitDetails ] = React.useState();

  const basicDetailsHandler = (details) => {
    console.log(details);
    setUnitDetails(details);
    handleNext();
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    // {
    //   label: 'Basic Details',
    //   description: <BasicDetailsForm onBasicDetails={basicDetailsHandler} onBack={handleBack} unitDetails={unitDetails}/>,
    // },
    {
      label: 'Amenitie',
      description: <AmenitiesForm/>,
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  const [ formSteps, setFormSteps ] = React.useState(steps);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={`${styles['create-unit-form-container']}`}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel sx={{}}>
              {step.label}
            </StepLabel>
            <StepContent>
              {step.description}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
