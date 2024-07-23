'use client';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import pusher from '@/lib/pusher';
import pusherClient from '@/lib/pusherClient';
import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';

import { useEffect } from 'react';

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      redirect('/login');
    }
  }, [user]);

  useEffect(() => {
    const channel = pusherClient.subscribe('my-channel');
    channel.bind('todo-channel', function (data: any) {
      alert(JSON.stringify(data));
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <main className="flex min-h-screen container mx-auto py-2">
      <div className="w-full">
        <AddTodo />
        <TodoList />
      </div>
    </main>
  );
}
