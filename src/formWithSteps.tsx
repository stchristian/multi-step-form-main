"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type FormErrors<T> = { [key in keyof T]?: string };

type FormContextType<T> = T & {
  setValue: (name: keyof T, value: any) => void;
  errors: FormErrors<T>;
  currentStep: number;
  submitStep: () => void;
  completed: boolean;
  submitForm: () => void;
  goBack: () => void;
};

export type ValidationFunction<T> = (values: T, step: number) => FormErrors<T>;

export function createFormWithSteps<T = unknown>({
  validateFn,
  steps,
}: {
  validateFn: ValidationFunction<T>;
  steps: Array<any>;
}) {
  const FormWithStepsContext = createContext<FormContextType<T> | undefined>(undefined);

  function useFormWithStepsContext() {
    const context = useContext(FormWithStepsContext);
    if (!context) {
      throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
  }

  function FormWithStepsProvider({ children, initialValues }: { children: React.ReactNode; initialValues: T }) {
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

    // const reset = useCallback(() => {
    //   setCompleted(false);
    //   setErrors({});
    //   setState(initialValues);
    //   setCurrentStep(1);
    // }, []);

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
        setState,
        errors,
        setValue,
        currentStep,
        submitStep,
        submitForm,
        goBack,
        completed,
      }),
      [state, goBack, setState, setValue, currentStep, submitStep, errors, completed, submitForm]
    );

    return <FormWithStepsContext.Provider value={value}>{children}</FormWithStepsContext.Provider>;
  }

  return { useFormWithStepsContext, FormWithStepsProvider };
}
