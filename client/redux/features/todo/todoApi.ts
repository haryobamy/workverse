import { User } from 'next-auth';
import { apiSlice } from '../api/apiSlice';
import { signOut } from 'next-auth/react';
import { ApiResponse, Todo } from '@/types';

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<any, any>({
      query: (data) => ({
        url: 'todo/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Todos', 'Todo'],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    getTodos: builder.query<ApiResponse<Todo[]>, void>({
      query: () => ({
        url: 'todo/getAll',
        method: 'GET',
      }),
      providesTags: ['Todos', 'Todo'],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    updateTodo: builder.mutation<any, any>({
      query: (data) => ({
        url: `todo/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Todos', 'Todo'],
    }),

    deleteTodo: builder.mutation<any, string>({
      query: (id) => ({
        url: `todo/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useLazyGetTodosQuery,
  useCreateTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
