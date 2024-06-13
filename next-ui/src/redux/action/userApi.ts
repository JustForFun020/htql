import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/user' }),
  endpoints: (builder) => ({
    findUserByEmail: builder.query({
      query: (email: string) => `find-user-by-email/${email}`,
    }),
  }),
});

export const { useLazyFindUserByEmailQuery } = userApi;
