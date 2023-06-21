import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: { value: { memberId: '', nickname: '' } },
  reducers: {
    responseUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default userInfoSlice.reducer;
export const { responseUserInfo } = userInfoSlice.actions;
