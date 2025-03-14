import type { FormikErrors } from 'formik';

export type InputPasswordType = 'password';
export type InputTextType = 'text';
export type InputEmailType = 'email';
export type InputDateType = 'date';
export type InputFileType = 'file';
export type InputSelectType = 'select';
export type InputNumberType = 'number';
export type InputTimeType = 'time';
export type InputPhoneType = 'tel';

export interface FieldProps {
  id: string;
  error?: boolean | string;
  touched?: boolean;
  label?: string;
  labelClassName?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary';
  touched?: boolean;
  error?: string;
  labelClassName?: string;
  label?: string;
  id: string;
  type?:
    | InputPasswordType
    | InputTextType
    | InputEmailType
    | InputDateType
    | InputNumberType
    | InputTimeType
    | InputPhoneType
    | string;
  inputClassName?: string;
  containerClassName?: string;
  initialValue?: string;
  initialTouched?: boolean;
  initialError?: string;
  eagerError?: boolean;
  helperText?: string;
  chosenWallet?: number;
  toAccount?: boolean;
  hiddenState?: boolean;
  searchIcon?: boolean;
  isLoading?: boolean;
}

export interface InputPinProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary';
  touched?: boolean;
  error?: string;
  eagerError?: boolean;
  labelClassName?: string;
  label?: string;
  helperText?: string;
  id: string;
  inputClassName?: string;
  containerClassName?: string;
  setValue?: (
    value: string,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  setTouched?: (
    touched: boolean,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  value?: string;
  numInputs?: number;
}

export type FieldOption = {
  readonly value: string;
  readonly label: string;
};

export type TertiaryOption = {
  readonly img?: string;
  readonly value: string;
  readonly label: string;
};

export type SelectProps = React.SelectHTMLAttributes<
  HTMLSelectElement | HTMLInputElement
> & {
  className?: string;
  id: string;
  error?: boolean | string;
  touched?: boolean;
  label?: string;
  labelClassName?: string;
  options?: readonly FieldOption[];
  setValue?: (
    value: string,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  setTouched?: (
    touched: boolean,
    shouldValidate: boolean
  ) => Promise<void | FormikErrors<unknown>>;
  value?: string;
  onValueChange?: (value: SelectOption) => void;
  isLoading?: boolean;
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export type SelectOption = { readonly value: string; readonly label: string };
