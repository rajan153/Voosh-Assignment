import toast from "react-hot-toast";
import { setTaskData } from "../../slices/taskSlice";
import { apiConnector } from "../apiConnector";
import { taskEndPoints } from "../api";

const {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASK,
  GET_TASK,
  UPDATE_PROGRESS_TASK,
  UPDATE_TASK,
} = taskEndPoints;

export function createTask({ title, description, dueDate }, token, navigate) {
  return async () => {
    try {
      console.log(title, description, dueDate);
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

      console.log(response);

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
