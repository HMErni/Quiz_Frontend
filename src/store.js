import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userAPI } from './Login/UserAPI';
import authSlice from './Login/authSlice';
import { quizAPI } from './Quiz/QuizAPI';
// import { resultAPI } from './Quiz/ResultAPI';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [quizAPI.reducerPath]: quizAPI.reducer,
    // [resultAPI.reducerPath]: resultAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      quizAPI.middleware,
      // resultAPI.middleware,
    ),
});

setupListeners(store.dispatch);
