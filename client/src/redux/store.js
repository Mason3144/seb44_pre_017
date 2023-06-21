import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './user';

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
  },
});
