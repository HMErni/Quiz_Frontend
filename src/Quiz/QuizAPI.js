import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quizAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5270/api',
  }),
  tagTypes: ['Quizes'],
  endpoints: (builder) => ({
    getQuizes: builder.query({
      query: () => ({
        url: '/QuizList',
        method: 'GET',
      }),
      providesTags: ['Quizes'],
    }),

    getQuizbyId: builder.query({
      query: (id) => ({
        url: `/QuizList/${id}`,
        method: 'GET',
      }),
      providesTags: ['Quizes'],
    }),

    createQuiz: builder.mutation({
      query: (quiz) => ({
        url: '/QuizList',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: quiz,
      }),
      invalidatesTags: ['Quizes'],
    }),

    updateQuiz: builder.mutation({
      query: ({ id, quiz }) => ({
        url: `/QuizList/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: quiz,
      }),
      invalidatesTags: ['Quizes'],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/QuizList/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quizes'],
    }),
  }),
});

export const {
  useGetQuizesQuery,
  useGetQuizbyIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizAPI;
