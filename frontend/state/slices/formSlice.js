import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postOrder = createAsyncThunk('form/postOrder', async (order, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:9009/api/pizza/order', order);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const formSlice = createSlice({
  name: 'form',
  initialState: {
    fullName: '',
    size: '',
    toppings: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setFormValue: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    toggleTopping: (state, action) => {
      const topping = action.payload;
      if (state.toppings.includes(topping)) {
        state.toppings = state.toppings.filter((top) => top !== topping);
      } else {
        state.toppings.push(topping);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.status = 'succeeded';
        state.fullName = '';
        state.size = '';
        state.toppings = [];
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { setFormValue, toggleTopping } = formSlice.actions;
export default formSlice.reducer;
