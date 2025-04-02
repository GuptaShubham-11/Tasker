import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice.js';
import authReducer from '../features/authSlice.js';
import taskReducer from '../features/taskSlice.js';
import weatherReducer from '../features/weatherSlice.js';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        task: taskReducer,
        weather: weatherReducer
    },
});

export default store;