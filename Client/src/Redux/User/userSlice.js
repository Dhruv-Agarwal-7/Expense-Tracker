import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        updateUser: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                ...action.payload,
            };
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, signOut, updateUser } = userSlice.actions;
export default userSlice.reducer;
