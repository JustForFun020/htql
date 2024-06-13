import token from '@/utils/token';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const javaCatalogApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/danh-muc-san-pham',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
  reducerPath: 'javaCatalogApi',
  endpoints: (builder) => ({
    getAllCatalog: builder.query({
      query: () => '/all',
    }),
  }),
});

export const { useGetAllCatalogQuery } = javaCatalogApi;
