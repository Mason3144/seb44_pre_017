import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './user';
import loginReducer from './login';
import tokenReducer from './token';

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    login: loginReducer,
    token: tokenReducer,
  },
});
