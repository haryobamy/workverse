'use client';
import React, { ChangeEvent } from 'react';
import {
  Control,
  Controller,
  FieldErrorsImpl,
  FieldValue,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import Input, { ITextInputProps } from './Input';
import { onNumberValidator } from '@/utils/utils';

type OmitTextField = Omit<ITextInputProps, 'name' | 'error' | 'onChange'> & {
  subText?: string;
  isNumber?: boolean;
};

interface IControllTextInput<TFieldValues extends FieldValues>
  extends OmitTextField {
  errors?: Partial<FieldErrorsImpl<TFieldValues>>;
  control: Control<TFieldValues, any>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

const ControlledInput = <TFormValues extends FieldValues>(
  props: IControllTextInput<TFormValues>
) => {
  const { control, name, rules, label, subText, isNumber, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...fields }, fieldState: { error } }) => (
        <Input
          label={label}
          error={error?.message}
          onChange={
            isNumber
              ? (e: ChangeEvent<HTMLInputElement>) => {
                  onNumberValidator(e, onChange);
                }
              : onChange
          }
          {...fields}
          {...rest}
        />
      )}
    />
  );
};

export default ControlledInput;
