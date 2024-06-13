import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let token = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}

export const supplierApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/nhacungcap',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  }),
  reducerPath: 'supplierApi',
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (nhaCungCapDTO) => ({
        url: 'them-ncc',
        method: 'POST',
        body: nhaCungCapDTO,
      }),
    }),
  }),
});

export const { useCreateSupplierMutation } = supplierApi;
