import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../services/TaskRoutes/TaskApi";

function EditCard({ setEditCardOpen, data }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const updateTaskHandler = async (editData) => {
    const taskId = data._id;
    if (
      data.title === editData.title &&
      data.description === editData.description &&
      data.dueData === editData.dueData
    ) {
      toast.success("No Changes");
      return;
    }

    try {
      dispatch(updateData(editData, taskId, token));
      setEditCardOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(updateTaskHandler)}
        className="w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-white p-6 flex flex-col justify-center shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px] gap-4"
      >
        <h2 className="font-bold text-center text-xl underline">Edit Task</h2>
        <input
          type="text"
          placeholder="Title"
          defaultValue={data.title}
          className="border border-gray-400 p-1"
          {...register("title", { required: true })}
        />
        <textarea
          type="text"
          placeholder="Description"
          defaultValue={data.description}
          className="border border-gray-400 p-1"
          {...register("description")}
        />
        <div className="flex gap-4">
          <p className="font-bold">Due Task: </p>
          <input type="datetime-local" {...register("dueDate")} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Submit
        </button>
        <button
          onClick={() => setEditCardOpen(false)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          close
        </button>
      </form>
    </div>
  );
}

export default EditCard;
