import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../services/TaskRoutes/TaskApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AddTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const fetchTask = async (data) => {
    try {
      dispatch(createTask(data, token, navigate));
      setOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-4 justify-center items-center">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded-lg"
      >
        Add Task
      </button>
      {open && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit(fetchTask)}
            className="w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-white p-6 flex flex-col justify-center shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px] gap-4"
          >
            <input
              type="text"
              placeholder="Title"
              className="border border-gray-400 p-1"
              {...register("title", { required: true })}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border border-gray-400 p-1"
              {...register("description")}
            />
            <div className="flex gap-4">
              <p className="font-bold">Due Task: </p>
              <input type="datetime-local" {...register("dueDate")} />
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
              Submit
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTask;
