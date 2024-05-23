import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  size: '',
  toppings: [],
  status: 'idle',
  errorMessage: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormState: () => initialState,
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { updateFormState, resetFormState, setStatus, setErrorMessage } = formSlice.actions;
export default formSlice.reducer;
