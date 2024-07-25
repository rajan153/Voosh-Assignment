import { Task } from "../models/Task.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (title === "" && description === "") {
    return res
      .status(201)
      .json(new ApiResponse(200, "Empty Task Created Successfully"));
  }

  await Task.create({
    title,
    description,
    dueDate: dueDate || Date.now() + 24 * 60 * 60 * 1000,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Task Created Successfully"));
});

const getTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res.status(400).json({
      message: "Task is required",
    });
  }

  const task = await Task.findById(taskId);

  return res.status(200).json(new ApiResponse(200, task, "Todo Fetched!"));
});

const getAllTask = asyncHandler(async (req, res) => {
  const { sortValue } = req.body;

  console.log(req.body);

  const newSortOrder = sortValue === "asc" ? 1 : -1;

  const todos = await Task.find({
    createdBy: req.user._id,
    dueDate: { $gt: new Date() },
  }).sort({
    _id: newSortOrder,
  });

  if (!todos) {
    return res.status(200).json(new ApiResponse(200, {}, "No Todos Present"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todos, "Todos Fetched Successfully!"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, due, reminders, taskId } = req.body;

  if (title === "" && description === "") {
    return res
      .status(204)
      .json(new ApiResponse(200, {}, "No Any Update Happened!"));
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      title: title,
      description: description,
      dueDate: dueDate,
      due: due,
      reminders: reminders,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Update Task Successfully!"));
});

const updateTaskProgress = asyncHandler(async (req, res) => {
  const { taskId, progressBar } = req.body;

  const task = await Task.findByIdAndUpdate(
    taskId,
    { progressBar: progressBar },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Update Task Successfully!"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;

  await Task.findByIdAndDelete(taskId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task Deleted Successfully!"));
});

export {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
  updateTaskProgress,
};
