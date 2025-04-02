import { createSlice } from "@reduxjs/toolkit";

// Get theme from localStorage or default to 'light' if not found
const initialTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";

const themeSlice = createSlice({
    name: "theme",
    initialState: { theme: initialTheme },
    reducers: {
        themeToggle: (state) => {
            // Toggle the theme and store it in localStorage
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.theme);
        }
    }
});

export const { themeToggle } = themeSlice.actions;
export default themeSlice.reducer;
