import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from './services/ordersApi';
import formReducer from './slices/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersApi.middleware),
});

export const resetStore = () => store;
