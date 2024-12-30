import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  dataFetched: false,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      if (action.payload.token) {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.dataFetched = true;
      }
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.dataFetched = false;
    }
  }
});

export const { setUserData, logout } = authSlice.actions;
export default authSlice.reducer; 