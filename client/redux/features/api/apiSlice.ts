import { appBaseUrl } from '@/lib/env';
import { TApiTag } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiTagTypes: TApiTag[] = ['Todo', 'Todos', 'Users', 'User'];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: appBaseUrl,
  }),
  tagTypes: apiTagTypes,

  endpoints: (builder) => ({}),
});
