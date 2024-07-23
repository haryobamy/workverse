'use client';
import React, { useEffect } from 'react';
import ControlledInput from './ui/ControlledInput';
import Button from './ui/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/redux/features/auth/authApi';

import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

function SignUp() {
  const [register, { isLoading, error, isSuccess, data }] =
    useRegisterMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    await register(data);
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Login successful';
      toast.success(message);
      redirect('/');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="h-screen w-full  py-10">
      <h1 className="text-3xl font-semibold text-center w-[600px] mx-auto mb-[20px] ">
        Sign up today for a collaborative to-do list experience with your team.
      </h1>

      <div className="shadow-md mt-5 p-5 w-[600px] mx-auto bg-white rounded-md ">
        <form>
          <ControlledInput
            control={control}
            name="username"
            rules={{ required: 'Email is required' }}
            label="Username"
            type="text"
          />

          <ControlledInput
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            label="Password"
            type="password"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            containClassName="w-full py-2"
          >
            {isLoading ? 'Signing up ....' : 'Sign Up'}
          </Button>
        </form>

        <h4 className="text-center mt-4">
          Already have an account?{' '}
          <span className="text-green-500">
            {' '}
            <Link href="/signup">Login</Link>{' '}
          </span>{' '}
        </h4>
      </div>
    </div>
  );
}

export default SignUp;
