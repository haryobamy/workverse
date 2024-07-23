import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from '@/redux/features/todo/todoApi';
import { Todo } from '@/types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ControlledInput from './ui/ControlledInput';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/store';
import pusher from '@/lib/pusher';

function AddTodo() {
  const { user } = useAppSelector((state) => state.auth);
  const { selectedTodo } = useAppSelector((state) => state.todo);
  const [isEdit, setisEdit] = useState(false);
  const [createTodo, { isLoading, error, isSuccess, data }] =
    useCreateTodoMutation();
  const [
    updateTodo,
    {
      isLoading: updating,
      isSuccess: updateSucces,
      error: updateError,
      data: updateData,
    },
  ] = useUpdateTodoMutation();

  const { handleSubmit, control, register, reset, setValue } = useForm<
    Omit<Todo, '_id' | 'username'>
  >({
    defaultValues: {
      title: '',
      desc: '',
      completed: false,
      date: Date.now(),
    },
  });

  const onSubmit = async (data: Omit<Todo, '_id' | 'username'>) => {
    const payload = {
      ...data,
      username: user?.username,
    };
    if (!isEdit) {
      await createTodo(payload);
    } else {
      await updateTodo({ payload, id: selectedTodo?._id });
    }
  };

  useEffect(() => {
    if (selectedTodo) {
      setisEdit(true);
      setValue('title', selectedTodo.title);
      setValue('desc', selectedTodo.desc);
      setValue('completed', selectedTodo.completed);
      setValue('date', selectedTodo.date);
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Todo created successfully ';
      pusher.trigger('todo-channel', 'new-task', data.data);
      reset();
      toast.success(message);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }

    if (updateSucces) {
      const message = updateData?.message || 'Todo updated successful';
      toast.success(message);
    }
    if (updateError) {
      if ('data' in updateError) {
        const errorData = updateError as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, updateError, updateSucces]);

  return (
    <div className="w-[600px]  mx-auto rounded-md p-5  bg-lime-400 ">
      <form className="">
        <ControlledInput
          control={control}
          name="title"
          rules={{ required: 'title is required' }}
          label="Title"
          type="text"
        />

        <div className="flex flex-col ">
          <label htmlFor="desc">Description</label>
          <textarea
            className="border border-green-800 rounded-md outline-none px-2 py-1 "
            id="desc"
            placeholder="Enter todo description"
            {...register('desc')}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-green-800 text-white px-2 py-1 rounded-md w-full mt-4"
        >
          {isEdit ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
