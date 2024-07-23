'use client';
import React, { InputHTMLAttributes } from 'react';

export type ITextInputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ label, ...props }: ITextInputProps) {
  return (
    <div className="flex flex-col mb-5">
      <label htmlFor={label} className="text-lg  font-[400]">
        {label}
      </label>
      <input
        {...props}
        className="border border-green-800 rounded-md outline-none px-2 py-1 "
      />
      <span className="text-red-500 text-sm">{props.error}</span>
    </div>
  );
}

export default Input;
