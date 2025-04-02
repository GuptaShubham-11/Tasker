import { createSlice } from "@reduxjs/toolkit";

// Load tasks from localStorage if available, with error handling
const loadTasks = () => {
    try {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
        return [];
    }
};

const saveTasks = (tasks) => {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Failed to save tasks to localStorage:", error);
    }
};

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: loadTasks(),
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload); // Add new task
            saveTasks(state.tasks);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload); // Remove task by ID
            saveTasks(state.tasks); // Persist updated task list
        },
    },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
