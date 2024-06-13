import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/invoices' }),
  endpoints: (builder) => ({
    getAllInvoices: builder.query({
      query: () => '',
    }),
    findInvoiceById: builder.query({
      query: (id: number) => `/${id}`,
    }),
    findInvoiceByCustomer: builder.query({
      query: (customer: string) => `/${customer}`,
    }),
    updateInvoiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetAllInvoicesQuery,
  useFindInvoiceByIdQuery,
  useLazyFindInvoiceByCustomerQuery,
  useUpdateInvoiceStatusMutation,
} = invoiceApi;
