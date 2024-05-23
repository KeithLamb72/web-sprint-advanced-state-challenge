import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: () => 'history',
    }),
    postOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'order',
        method: 'POST',
        body: newOrder,
      }),
    }),
  }),
});

export const { useFetchOrdersQuery, usePostOrderMutation } = ordersApi;
