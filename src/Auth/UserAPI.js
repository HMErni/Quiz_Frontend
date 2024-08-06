import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userAPI = createApi({
  reducerPath: 'Login',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5270/api',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (user) => ({
        url: '/Login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    RegisterUser: builder.mutation({
      query: (user) => ({
        url: '/User',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    getResults: builder.query({
      query: () => ({
        url: '/Result',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    createResult: builder.mutation({
      query: (result) => ({
        url: '/Result',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: result,
      }),
      invalidatesTags: ['User'],
    }),

    updateResult: builder.mutation({
      query: ({ id, result }) => ({
        url: `/Result/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: result,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useGetResultsQuery,
  useCreateResultMutation,
  useUpdateResultMutation,
} = userAPI;
