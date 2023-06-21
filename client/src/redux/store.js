import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
  },
});
