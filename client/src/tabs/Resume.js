import React, { useRef } from "react";
import { ResumeStep1 } from "../components/ResumeStep1";
import { ResumeStep2 } from "../components/ResumeStep2";
import { ResumeStep3 } from "../components/ResumeStep3";
import { MultiStepForm } from "../components/MultiStepForm/MultiStepForm";
import { downloadFile } from "../utils";
import axios from "axios";

export const Resume = () => {
  const stepRefs = [useRef(), useRef(), useRef()];

  let data = {};
  const downloadResume = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/resume", data, {
        responseType: "blob",
      });

      // Convert the response to a blob
      const resumeBlob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      downloadFile(resumeBlob, "resume.docx");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="text-light">
      <MultiStepForm
        title="Resume Builder"
        activeStep={0}
        submitButtonTitle="Download Resume"
        onPreviousClicked={(currentStep) => {
          console.log("Previous clicked on step ", currentStep);
        }}
        onNextClicked={(currentStep) => {
          const isValid = stepRefs[currentStep].current.isValid();
          if (isValid) {
            data = { ...data, ...stepRefs[currentStep].current.getData() };
          }
          console.log("Next clicked on step ", currentStep);
          return isValid;
        }}
        onSubmitClicked={() => {
          const currentStep = stepRefs.length - 1;
          const isValid = stepRefs[currentStep].current.isValid();
          if (isValid) {
            data = { ...data, ...stepRefs[currentStep].current.getData() };

            console.log("Form data", data);
            downloadResume(data);
          }
        }}
      >
        <ResumeStep1 title="Personal Details" ref={stepRefs[0]} />
        <ResumeStep2 title="Academic Details" ref={stepRefs[1]} />
        <ResumeStep3 title="Experience" ref={stepRefs[2]} />
      </MultiStepForm>
    </div>
  );
};
