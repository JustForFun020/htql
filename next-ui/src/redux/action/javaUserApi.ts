import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const javaUserApi = createApi({
  reducerPath: 'javaUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/nguoidung' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = javaUserApi;
