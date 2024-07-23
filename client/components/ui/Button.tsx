import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  containClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ ...props }: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={`bg-green-800 text-white px-2 py-1 rounded-md w-full mt-4 ${props.containClassName}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
