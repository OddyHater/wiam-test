import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import {
  Input,
  Select,
  Slider,
  type InputProps,
  type SelectProps,
  type SliderProps,
} from 'src/components/shared';

type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<InputProps, 'value' | 'onChange' | 'error' | 'isValid'>;

type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<SelectProps, 'value' | 'onChange' | 'error' | 'isValid'>;

type FormSliderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<SliderProps, 'value' | 'onChange'>;

export const FormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  defaultValue,
  disabled,
  ...inputProps
}: FormInputProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
    disabled,
  });

  return (
    <Input
      {...inputProps}
      name={field.name}
      value={field.value ?? ''}
      onChange={field.onChange}
      error={fieldState.error?.message}
      isValid={!fieldState.invalid}
    />
  );
};

export const FormSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  disabled,
  ...selectProps
}: FormSelectProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
  });

  return (
    <Select
      {...selectProps}
      value={field.value ?? ''}
      onChange={field.onChange}
      error={fieldState.error?.message}
      isValid={!fieldState.invalid}
    />
  );
};

export const FormSlider = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  defaultValue,
  disabled,
  ...sliderProps
}: FormSliderProps<TFieldValues, TName>) => {
  const { field } = useController({
    control,
    name,
    rules,
    defaultValue,
    disabled,
  });

  return (
    <Slider
      {...sliderProps}
      value={Number(field.value ?? 0)}
      onChange={field.onChange}
    />
  );
};
