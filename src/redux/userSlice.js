import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {isLoggedIn: false, userData: null},
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout: () => {
            return {};
        }
    }
})

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;