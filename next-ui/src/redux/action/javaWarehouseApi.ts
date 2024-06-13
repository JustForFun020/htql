import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let token = '';
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || '';
}

export const javaWarehouseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/phieunhap',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }),
  reducerPath: 'javaWarehouseApi',
  endpoints: (builder) => ({
    getAllReceipts: builder.query({
      query: () => '',
    }),
    createReceipt: builder.mutation({
      query: (receipt) => ({
        url: '',
        method: 'POST',
        body: receipt,
      }),
    }),
    findReceiptById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetAllReceiptsQuery, useCreateReceiptMutation, useFindReceiptByIdQuery } = javaWarehouseApi;
