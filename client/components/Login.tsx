'use client';
import React, { useEffect } from 'react';
import ControlledInput from './ui/ControlledInput';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import { signIn } from 'next-auth/react';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

function Login() {
  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();
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
    const result = await login(data);
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
      <h1 className="text-3xl font-semibold text-center  ">Welcome Back</h1>

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
            {isLoading ? 'Login in ....' : 'Login'}
          </Button>
        </form>

        <h4 className="text-center mt-4">
          Don't have an account?{' '}
          <span className="text-green-500">
            {' '}
            <Link href="/signup">Signup</Link>{' '}
          </span>{' '}
        </h4>
      </div>
    </div>
  );
}

export default Login;
