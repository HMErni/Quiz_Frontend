import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authAPI } from './Login/LoginAPI';
import authSlice from './Login/authSlice';
import { quizAPI } from './Quiz/QuizAPI';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authAPI.reducerPath]: authAPI.reducer,
    [quizAPI.reducerPath]: quizAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, quizAPI.middleware),
});

setupListeners(store.dispatch);
