import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: 'login',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    }
  }
});

// actions 내보내기
export const authActions = authSlice.actions;
export default authSlice.reducer;