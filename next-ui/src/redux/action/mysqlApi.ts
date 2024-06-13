import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mysqlApi = createApi({
  reducerPath: 'mysqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/mysql' }),
  endpoints: (builder) => ({
    getAllProductsForClient: builder.query({
      query: () => 'mysql',
    }),
    createManyProduct: builder.mutation({
      query: (products) => ({
        url: '/',
        method: 'POST',
        body: products,
      }),
    }),
    findProductMysqlByName: builder.query({
      query: (name) => {
        return {
          url: `find-product-by-name/${name}`,
          method: 'GET',
          params: { name },
          header: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
      },
    }),
  }),
});

export const { useGetAllProductsForClientQuery, useCreateManyProductMutation, useLazyFindProductMysqlByNameQuery } =
  mysqlApi;
