'use client';
import { Todo } from '@/types';
import React, { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { format } from 'date-fns';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/redux/features/todo/todoApi';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/store';
import { setSelectedTodo } from '@/redux/features/todo/todoSlice';
import pusher from '@/lib/pusher';

type Props = {
  todo: Todo;
};

function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch();
  const [
    deleteTodo,
    {
      isLoading: deleting,
      isSuccess: deleteSuccess,
      error: deleteError,
      data: deleteData,
    },
  ] = useDeleteTodoMutation();
  const [updateTodo, { isLoading, isSuccess, error, data }] =
    useUpdateTodoMutation();

  const onEdit = async (todo: Todo, completed: boolean) => {
    const payload = {
      ...todo,
      completed: completed,
    };

    await updateTodo({ payload, id: todo?._id });
  };

  const onDelete = async (id: string) => {
    await deleteTodo(id);
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Todo updated successful';
      pusher.trigger('todo-channel', 'update-todo', data.data);
      toast.success(message);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }

    if (deleteSuccess) {
      const message = deleteData?.message || 'Todo deleted successful';
      toast.success(message);
    }
    if (deleteError) {
      if ('data' in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, deleteSuccess, deleteError]);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-4 ">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            className="w-5 h-5 text-lime-500 border-2 border-gray-300 rounded focus:ring-lime-500 focus:ring-2"
            checked={todo.completed}
            defaultChecked={todo.completed}
            onChange={() => onEdit(todo, !todo.completed)}
          />
          <h2 className="font-semibold text-xl">{todo.title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(setSelectedTodo(todo))}
            className="text-green-500 hover:text-green-700 font-semibold"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <p className="text-gray-700">{todo.desc}</p>
      <div className="flex flex-col gap-2 justify-between text-sm text-gray-500">
        <p>
          Created By : <span> {todo.username}</span>
        </p>
        <p>{format(new Date(todo.date), 'dd/MM/yyyy')}</p>
      </div>
    </div>
  );
}

export default TodoItem;
