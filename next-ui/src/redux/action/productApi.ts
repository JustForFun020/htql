import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { javaCatalogApi } from './javaCatalogApi';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/products' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '',
    }),
    findProductById: builder.query({
      query: (id: string) => `/${id}`,
    }),
    findProductByName: builder.query({
      query: (name: string) => `search/${name}`,
    }),
    updateProductById: builder.mutation({
      query: ({ id, updateProductDto }) => ({
        url: `update/${id}`,
        method: 'PATCH',
        body: updateProductDto,
        params: { id },
      }),
    }),
    deleteProductById: builder.mutation({
      query: (id: string) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
    }),
    getProductByCatalog: builder.query({
      query: (cid: number) => `by-catalog/${cid}`,
    }),
    updateProductAmount: builder.mutation({
      query: ({ pid, amount, did }) => ({
        url: `update-amount/${pid}`,
        method: 'PATCH',
        body: { pid, amount, did },
        params: { pid },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useFindProductByIdQuery,
  useLazyFindProductByIdQuery,
  useLazyFindProductByNameQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
  useLazyGetProductByCatalogQuery,
  useUpdateProductAmountMutation,
} = productApi;
