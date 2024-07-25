// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://voosh-assignment-2xa4.onrender.com/api/v1";

export const endPoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/login",
  UPDATE_AVATAR: BASE_URL + "/users/avatar",
};

export const taskEndPoints = {
  CREATE_TASK: BASE_URL + "/tasks/create-task",
  DELETE_TASK: BASE_URL + "/tasks/delete-task",
  GET_ALL_TASK: BASE_URL + "/tasks/get-task",
  GET_TASK: BASE_URL + "/tasks/task/:taskId",
  UPDATE_TASK: BASE_URL + "/tasks/update-task",
  UPDATE_PROGRESS_TASK: BASE_URL + "/tasks/update-progress",
};
