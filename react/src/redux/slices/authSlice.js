// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
