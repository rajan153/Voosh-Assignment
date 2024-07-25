import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: localStorage.getItem("taskData")
    ? JSON.parse(localStorage.getItem("taskData"))
    : null,
  createdTodos: [],
  processingTodos: [],
  completedTodos: [],
  searchResults: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setTaskData(state, action) {
      state.taskData = action.payload;

      state.createdTodos = [];
      state.processingTodos = [];
      state.completedTodos = [];

      action.payload.map((data, index) => {
        switch (data.progressBar) {
          case "Todos":
            state.createdTodos.push(data);
            break;
          case "In-Progress":
            state.processingTodos.push(data);
            break;
          case "Done":
            state.completedTodos.push(data);
            break;
        }
      });
    },
    setCreatedTodos(state, action) {
      state.createdTodos = action.payload;
    },
    setProcessingTodos(state, action) {
      state.processingTodos = action.payload;
    },
    setCompletedTodos(state, action) {
      state.completedTodos = action.payload;
    },
    searchTasks(state, action) {
      const query = action.payload.toLowerCase();
      state.searchResults = state.taskData.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    },
  },
});

export const {
  setTaskData,
  setCompletedTodos,
  setCreatedTodos,
  setProcessingTodos,
  searchTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
