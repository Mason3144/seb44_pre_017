import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './userSlice';
import loginReducer from './login';
import responseUserInfoReducer from './userInfoSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    sidebar: sidebarReducer,
    responseUserInfo: responseUserInfoReducer,
  },
  // 아래처럼 user.username으로 값을 찾아서 사용하면 됩니다.
  // <div>username: {user.username}</div>
  // <div>password: {user.password}</div>
});
