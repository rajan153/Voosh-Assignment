import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: localStorage.getItem("taskData")
    ? JSON.parse(localStorage.getItem("taskData"))
    : null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setTaskData(state, action) {
      state.taskData = action.payload;
    },
  },
});

export const { setTaskData } = taskSlice.actions;
export default taskSlice.reducer;
