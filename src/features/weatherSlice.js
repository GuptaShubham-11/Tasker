import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&aqi=yes`
            );
            return data;
        } catch (err) {
            // Handle error and return meaningful message
            return rejectWithValue(
                err.response?.data?.message || err.message || "Failed to fetch weather data"
            );
        }
    }
);

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {}, // Placeholder for any future reducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Update weather data
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Unknown error occurred"; // Handle rejection errors
            });
    },
});

export default weatherSlice.reducer;
