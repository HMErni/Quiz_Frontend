import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userAPI } from './Auth/UserAPI';
import authSlice from './Auth/authSlice';
import { quizAPI } from './Quiz/QuizAPI';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [quizAPI.reducerPath]: quizAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, quizAPI.middleware),
});

setupListeners(store.dispatch);
