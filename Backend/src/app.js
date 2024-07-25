import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import cron from "node-cron";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  try {
    const tasksDueSoon = await Task.find({
      dueDate: { $lte: oneHourLater, $gt: now },
    }).populate("createdBy");

    tasksDueSoon.forEach(async (task) => {
      // Add your email-sending logic here using nodemailer or another email library
      const status = await mailSender(
        task.createdBy.email,
        "Reminder Mail",
        reminderFunction(
          task.createdBy.firstName,
          task.createdBy.lastName,
          task._id,
          task.title
        )
      );
    });
  } catch (error) {
    console.error("Error checking tasks due soon:", error);
  }
});

// Routes Import
import userRouter from "./routers/User.routes.js";
import taskRouter from "./routers/Task.routes.js";
import { Task } from "./models/Task.model.js";
import reminderFunction from "./template/reminder.js";
import { mailSender } from "./utils/mailSender.js";

// Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

export { app };
