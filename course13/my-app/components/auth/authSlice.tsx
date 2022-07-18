import { createSlice } from '@reduxjs/toolkit'
export enum AUTH_STATUS {
  LOGOUT, LOGIN
}
export const authSlice = createSlice({
  name: 'status',
  initialState: {
    value: AUTH_STATUS.LOGOUT,
  },
  reducers: {
    login: (state) => {
      state.value = AUTH_STATUS.LOGIN;
    },
    logout: (state) => {
      state.value = AUTH_STATUS.LOGOUT;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions
export default authSlice.reducer