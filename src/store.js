import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { loginSlice } from './Login/LoginAPI';

export const store = configureStore({
  reducer: {
    [loginSlice.reducerPath]: loginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginSlice.middleware),
});

setupListeners(store.dispatch);
