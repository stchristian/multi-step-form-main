export type FormErrors<T> = { [key in keyof T]?: string };

export type MultiStepFormContextValueType<T> = T & {
  errors: FormErrors<T>;
  currentStep: number;
  completed: boolean;
  setValue: (name: keyof T, value: any) => void;
  submitStep: () => void;
  submitForm: () => void;
  goBack: () => void;
};

export type ValidationFunction<T> = (values: T, step: number) => FormErrors<T>;

export type FormStep = {
  path: string;
  name: string;
};

export type CreateMultiStepFormArgs<T> = {
  validateFn: ValidationFunction<T>;
  steps: ReadonlyArray<FormStep>;
};

export type MultiStepProviderProps<T> = { children: React.ReactNode; initialValues: T };
