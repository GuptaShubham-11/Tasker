import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage if exists, with error handling
let storedUser = null;

try {
    if (localStorage.getItem('loggedInUser') === 'true') {
        storedUser = JSON.parse(localStorage.getItem("user"));
    }
} catch (error) {
    console.error("Failed to retrieve user from localStorage:", error);
}

const initialState = {
    user: storedUser || null,
    isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("loggedInUser", "true");
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("loggedInUser");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
