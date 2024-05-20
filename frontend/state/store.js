import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './slices/ordersSlice'
import formReducer from './slices/formSlice'

export const resetStore = () => configureStore({
  reducer: {
    orders: ordersReducer,
    form: formReducer,
    // add your reducer(s) here
  }  // using Redux Thunk for your networking: you can ignore this
})

export const store = resetStore()
