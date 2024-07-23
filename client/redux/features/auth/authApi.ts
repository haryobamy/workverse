import { User } from 'next-auth';
import { apiSlice } from '../api/apiSlice';
import { signOut } from 'next-auth/react';

import { setCredentials, userLoggedOut } from './authSlice';

interface CustomError {
  status: 'CUSTOM_ERROR';
  data: string;
}

type LoginDTo = {
  username: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginDTo>({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        body: { username, password },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            setCredentials({
              token: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    register: builder.mutation<any, LoginDTo>({
      query: (body) => ({
        url: 'registration',
        method: 'POST',
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            setCredentials({
              token: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    //logout user
    logOut: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }: any) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutQuery, useRegisterMutation } =
  authApi;
