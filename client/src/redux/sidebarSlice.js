import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
  },
});

export const toggleSidebar = sidebarSlice.actions.toggleSidebar;

export default sidebarSlice.reducer;
