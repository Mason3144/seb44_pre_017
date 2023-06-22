import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './user';
import loginReducer from './loginSlice';
import responseUserInfoReducer from './userInfoSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    login: loginReducer,
    responseUserInfo: responseUserInfoReducer,
  },
});
