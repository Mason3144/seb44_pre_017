import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './userSlice';
import userInfoSlice from './userInfoSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    userInfo: userInfoSlice,
  },
});
