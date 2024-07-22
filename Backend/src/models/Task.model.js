import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    progressBar: {
      type: String,
      enum: ["Todos", "In-Progress", "Done"],
      default: "Todos",
    },
    dueDate: {
      type: Date,
      default: Date.now(),
    },
    due: {
      type: Boolean,
      default: false,
    },
    reminders: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
