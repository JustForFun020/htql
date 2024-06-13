import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let token = '';
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || '';
}

export const invoiceJavaApi = createApi({
  reducerPath: 'invoiceJavaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/hoa-don',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }),
  endpoints: (builder) => ({
    getAllInvoicesJava: builder.query({
      query: () => '/all',
    }),
    findInvoiceById: builder.query({
      query: (id: number) => `/${id}`,
    }),
    findInvoiceByCustomer: builder.query({
      query: (customer: string) => `/${customer}`,
    }),
    createInvoice: builder.mutation({
      query: (hoaDonDTO) => ({
        url: '/tao-hoa-don',
        method: 'POST',
        body: hoaDonDTO,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }),
    }),
  }),
});

export const { useCreateInvoiceMutation, useGetAllInvoicesJavaQuery } = invoiceJavaApi;
