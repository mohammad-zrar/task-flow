import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/entity-types";
import api from "../../utils/api";

const initialState: {
    tasks: Task[];
    loading: boolean;
    error: string | null;
} = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>(
    "tasks/fetchTasks",
    async () => {
        const response = await api.get("/tasks");
        return response.data;
    }
);

export const createTask = createAsyncThunk<Task, { title: string }>(
    "tasks/createTask",
    async (taskData) => {
        const response = await api.post("/tasks", taskData);
        return response.data.task;
    }
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchTasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            })
            // createTask
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                // Add the newly created task to the existing list
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create task";
            });
    },
});

export default tasksSlice.reducer;
