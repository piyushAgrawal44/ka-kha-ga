// store/slices/auth.slice.ts - Redux auth slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth.type';
import LocalStorageUtil from '../../utils/local-storage';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthState['user'];
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      const LS= new LocalStorageUtil();
      LS.setToken(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      const LS= new LocalStorageUtil();
      LS.logoutUser();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;