import { AuthState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    userLoggedOut: (state) => {
      state.token = '';
      state.user = null;
    },
  },
});

export const { setCredentials, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
