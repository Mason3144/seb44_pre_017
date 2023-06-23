import { createSlice } from '@reduxjs/toolkit';

export const writerSlice = createSlice({
  name: 'writer',
  initialState: {
    value: { memberId: null },
  },
  reducers: {
    writerInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { writerInfo } = writerSlice.actions;
export default writerSlice.reducer;
