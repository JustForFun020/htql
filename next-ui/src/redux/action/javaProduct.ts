import token from '@/utils/token';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const javaProduct = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/sanpham',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
  reducerPath: 'javaProductApi',
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (sanPhamDTO) => {
        console.log('this is sanPhamDTO', sanPhamDTO);
        return {
          url: '',
          method: 'POST',
          body: sanPhamDTO,
        };
      },
    }),
  }),
});

export const { useCreateProductMutation } = javaProduct;
