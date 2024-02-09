"use client";

import {
  CreateMultiStepFormArgs,
  MultiStepFormContextValueType,
  FormErrors,
  MultiStepProviderProps,
} from "@/generic-multi-step-form/MultiStepForm.types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export function createMultiStepForm<T = unknown>({ validateFn, steps }: CreateMultiStepFormArgs<T>) {
  const MultiStepFormContext = createContext<MultiStepFormContextValueType<T> | undefined>(undefined);

  function useMultiStepFormContext() {
    const context = useContext(MultiStepFormContext);
    if (!context) {
      throw new Error("useMultiStepFormContext must be used within a MultiStepFormProvider");
    }
    return context;
  }

  function MultiStepFormProvider({ children, initialValues }: MultiStepProviderProps<T>) {
    const router = useRouter();
    const pathname = usePathname();

    const [state, setState] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});
    const [completed, setCompleted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const submitStep = useCallback(() => {
      // Validate step
      const errors = validateFn(state, currentStep);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      } else {
        setErrors({});
      }
      //Load step
      if (currentStep !== steps.length) {
        router.push(steps[currentStep].path);
      }
    }, [currentStep, router, state]);

    const submitForm = useCallback(() => {
      setCompleted(true);
    }, []);

    const goBack = useCallback(() => {
      // Validate step
      if (currentStep !== 1) {
        router.push(steps[currentStep - 2].path);
      }
    }, [currentStep, router]);

    useEffect(() => {
      const index = steps.findIndex((step) => step.path === pathname);
      if (index === -1) return;
      setCurrentStep(index + 1);
    }, [setCurrentStep, pathname]);

    const setValue = useCallback(
      (name: keyof T, value: any) => {
        setState((oldState) => ({
          ...oldState,
          [name]: value,
        }));
      },
      [setState]
    );

    const value = useMemo(
      () => ({
        ...state,
        errors,
        currentStep,
        completed,
        setState,
        setValue,
        submitStep,
        submitForm,
        goBack,
      }),
      [state, goBack, setState, setValue, currentStep, submitStep, errors, completed, submitForm]
    );

    return <MultiStepFormContext.Provider value={value}>{children}</MultiStepFormContext.Provider>;
  }

  return { useMultiStepFormContext, MultiStepFormProvider };
}
