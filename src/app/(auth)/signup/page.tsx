"use client";
import { useState } from "react";
import StepOne from "./steps/Step1";
import StepTwo from "./steps/Step2";
import StepThree from "./steps/Step3";
import StepFour from "./steps/Step4";

const Signup = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((e) => e + 1);
  const prevStep = () => setStep((e) => e - 1);


  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne nextStep={nextStep} />;
      case 2:
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepFour prevStep={prevStep} />;
      default:
        return <StepOne nextStep={nextStep} />;
    }
  };

  return <div className="signup-container">{renderStep()}</div>;
};

export default Signup;
