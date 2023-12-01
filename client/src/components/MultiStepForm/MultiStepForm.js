import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./MultiStepForm.css";

export const MultiStepForm = ({
  children,
  title,
  onPreviousClicked,
  onNextClicked,
  onSubmitClicked,
  submitButtonTitle,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = children.map((item, index) => ({
    title: item.props.title || `Step ${index + 1}`,
    completed: index < activeStep,
  }));

  const renderProgress = () => {
    return (
      <Container className="mb-3 step-progress">
        {steps.map((step, index) => (
          <div key={index} className="d-flex flex-column align-items-center">
            <p>{step.title}</p>
            <div className={`step ${step.completed ? "completed" : ""}`}>
              {step.completed ? <CheckIcon /> : null}
            </div>
          </div>
        ))}
      </Container>
    );
  };

  return (
    <Container className="mb-3">
      <h2>{title}</h2>
      <hr />

      {/* Show step progress */}
      {renderProgress()}

      {/* Show active step content */}
      <div>
        {children.map((item, index) => (
          <div
            key={index}
            className={`p-2 ${index === activeStep ? "" : "d-none"}`}
          >
            {item}
          </div>
        ))}
        <div className="d-flex justify-content-center">
          {activeStep > 0 && (
            <Button
              className="bg-primary p-2 me-3"
              onClick={() => {
                if (onPreviousClicked) {
                  onPreviousClicked(activeStep);
                }
                setActiveStep(activeStep - 1);
              }}
            >
              Previous
            </Button>
          )}
          {activeStep < children.length - 1 && (
            <Button
              className="bg-primary p-2"
              onClick={() => {
                let goNext = true;
                if (onNextClicked) {
                  goNext = onNextClicked(activeStep);
                }

                if (goNext) {
                  setActiveStep(activeStep + 1);
                }
              }}
            >
              Next
            </Button>
          )}
          {activeStep === children.length - 1 && (
            <Button
              className="bg-primary p-2"
              onClick={() => onSubmitClicked()}
            >
              {submitButtonTitle || "Submit"}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};
