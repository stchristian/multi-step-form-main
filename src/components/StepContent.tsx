"use client";
import { PropsWithChildren } from "react";
import { Button } from "./Button";
import { useFormWithStepsContext } from "@/multiStepForm";

export function Header({ children }: PropsWithChildren<{}>) {
  return <h1 className="text-2xl lg:text-3xl text-blue-marine font-bold mb-2 mt-2 lg:mt-10">{children}</h1>;
}

export function Description({ children }: PropsWithChildren<{}>) {
  return <p className="text-base text-gray-cool mb-6">{children}</p>;
}

export function StepContent({ children }: React.PropsWithChildren<{}>) {
  const { submitStep, currentStep, goBack, submitForm, completed } = useFormWithStepsContext();

  const canGoBack = currentStep !== 1;

  return (
    <div className="contents lg:flex lg:flex-col lg:w-full max-w-[500px] mx-auto">
      <div className="bg-white lg:contents p-6 rounded-xl m-4 shadow-lg flex flex-col">{children}</div>
      {!completed && (
        <footer className="flex flex-row-reverse sticky lg:static bottom-0 shadow-lg lg:shadow-none bg-white p-4 mt-auto justify-between lg:p-0">
          {currentStep === 4 ? (
            <Button onClick={submitForm} variant="tertiary">
              Confirm
            </Button>
          ) : (
            <Button onClick={submitStep}>Next Step</Button>
          )}

          {canGoBack && (
            <Button variant="secondary" onClick={goBack}>
              Go Back
            </Button>
          )}
        </footer>
      )}
    </div>
  );
}
