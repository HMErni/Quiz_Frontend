import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'Login',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5270/api',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    newLogin: builder.mutation({
      query: (user) => ({
        url: '/Login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useNewLoginMutation } = authAPI;
