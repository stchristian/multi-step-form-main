"use client";
import { FormErrors, createFormWithSteps } from "./formWithSteps";
import { steps } from "@/constants/steps";

type PeriodType = "monthly" | "yearly";

export type FormValues = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  period: PeriodType;
  planId?: number;
  selectedAddonIds: number[];
};

function validateFn(values: FormValues, step: number) {
  const errors: FormErrors<FormValues> = {};

  if (step === 1) {
    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
  }
  return errors;
}

export const { useFormWithStepsContext, FormWithStepsProvider } = createFormWithSteps<FormValues>({
  validateFn,
  steps,
});
