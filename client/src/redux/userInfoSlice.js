import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: { value: { memberId: '', nickname: '' } },
  reducers: {
    responseUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { responseUserInfo } = userSlice.actions;
