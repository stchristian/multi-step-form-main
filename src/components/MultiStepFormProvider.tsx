"use client";

import { FormValues, FormWithStepsProvider } from "@/multiStepForm";
import { PropsWithChildren } from "react";

const initialValues: FormValues = {
  planId: 1,
  selectedAddonIds: [],
  period: "monthly",
};
export function MultiStepFormProvider({ children }: PropsWithChildren<{}>) {
  return <FormWithStepsProvider initialValues={initialValues}>{children}</FormWithStepsProvider>;
}
