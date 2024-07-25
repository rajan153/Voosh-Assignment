import toast from "react-hot-toast";
import {
  setCompletedTodos,
  setCreatedTodos,
  setProcessingTodos,
  setTaskData,
} from "../../slices/taskSlice";
import { apiConnector } from "../apiConnector";
import { taskEndPoints } from "../api";
import { useSelector } from "react-redux";

const {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASK,
  UPDATE_PROGRESS_TASK,
  UPDATE_TASK,
} = taskEndPoints;

export function createTask({ title, description, dueDate }, token, navigate) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_TASK,
        {
          title,
          description,
          dueDate,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function getAllTask(sortValue, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        GET_ALL_TASK,
        { sortValue },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      dispatch(setTaskData(response.data.data));
      localStorage.setItem("taskData", JSON.stringify(response.data.data));

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updateProgress(taskId, progressBar, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "PATCH",
        UPDATE_PROGRESS_TASK,
        {
          taskId,
          progressBar,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      // toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function updateData({ title, description, dueDate }, taskId, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "PATCH",
        UPDATE_TASK,
        {
          taskId,
          title,
          description,
          dueDate,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function deleteTask(taskId, token, setConfirmationModal) {
  return async () => {
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_TASK,
        {
          taskId,
        },
        { Authorization: `Bearer ${token}` }
      );
      console.log("RESPONSE: ", response);

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      setConfirmationModal(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
