'use client';
import React, { useState } from 'react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';
import { useLogOutQuery } from '@/redux/features/auth/authApi';

function Header() {
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const { user } = useAppSelector((state) => state.auth);

  const signOut = () => {
    if (user) {
      setLogout(true);
      redirect('/login');
    }
  };
  return (
    <header className="bg-green-900 w-full  py-4   ">
      <div className="container mx-auto  flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-500   flex items-center gap-4">
          <IoMdCheckboxOutline />
          Workverse TODO
        </h1>

        {user && (
          <button
            className="text-white flex items-center gap-2"
            onClick={() => signOut()}
          >
            Logout <AiOutlineLogout className="text-xl text-red-400" />{' '}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
