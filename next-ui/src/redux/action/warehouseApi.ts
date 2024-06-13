import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let token = '';
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || '';
}

export const warehouseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/mysql',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }),
  endpoints: (builder) => ({
    importProduct: builder.mutation({
      query: (importProduct) => ({
        url: 'import-product',
        method: 'POST',
        body: importProduct,
      }),
    }),
  }),
});

export const { useImportProductMutation } = warehouseApi;
