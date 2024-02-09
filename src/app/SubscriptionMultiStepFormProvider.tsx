"use client";

import { FormValues, MultiStepFormProvider } from "@/app/SubscriptionMultiStepForm";
import { PropsWithChildren } from "react";

const initialValues: FormValues = {
  planId: 1,
  selectedAddonIds: [],
  period: "monthly",
};

export function SubscriptionMultiStepFormProvider({ children }: PropsWithChildren<{}>) {
  return <MultiStepFormProvider initialValues={initialValues}>{children}</MultiStepFormProvider>;
}
