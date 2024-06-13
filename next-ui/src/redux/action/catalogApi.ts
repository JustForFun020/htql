import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/catalog' }),
  endpoints: (builder) => ({
    classificationCatalog: builder.query({
      query: ({ listCriteria }) => ({
        url: 'classifications',
        method: 'POST',
        body: listCriteria,
      }),
    }),
  }),
});

export const { useLazyClassificationCatalogQuery } = catalogApi;
