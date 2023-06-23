import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './userSlice';
import loginReducer from './loginSlice';
import responseUserInfoReducer from './userInfoSlice';
import writerReducer from './writerSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    login: loginReducer,
    responseUserInfo: responseUserInfoReducer,
    userInfo: responseUserInfoReducer,
    writer: writerReducer,
  },
});
