import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: { value: { authorization: '', refresh: '' } },
  reducers: {
    token: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default tokenSlice.reducer;
export const { token } = tokenSlice.actions;
