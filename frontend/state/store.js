import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from '../state/slices/ordersSlice'
import formReducer from '../state/slices/formSlice'

export const resetStore = () => configureStore({
  reducer: {
    orders: ordersReducer,
    form: formReducer,
  }
})

export const store = resetStore()
