export type FormErrors<T> = { [key in keyof T]?: string };
export type Setter<T> = (name: keyof T, value: any) => void;

export type MultiStepFormContextValueType<T> = T & {
  errors: FormErrors<T>;
  currentStep: number;
  completed: boolean;
  setValue: Setter<T>;
  submitStep: () => void;
  submitForm: () => void;
  goBack: () => void;
};

export type ValidationFunction<T> = (values: T, step: number) => FormErrors<T>;

export type FormStep = {
  path: string;
  name: string;
};

export type CreateMultiStepFormOptions<T> = {
  validateFn: ValidationFunction<T>;
  steps: ReadonlyArray<FormStep>;
};

export type MultiStepProviderProps<T> = { children: React.ReactNode; initialValues: T };
