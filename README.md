# Task Manager Application

This is a full-stack task manager application that allows users to manage tasks with features such as setting due dates and receiving email reminders. The application is divided into two main parts: the backend and the frontend.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend](#backend)
  - [Routes](#backend-routes)
    - [User](#user)
    - [Task](#task)
  - [Backend-Run](#Running)
- [Frontend](#frontend)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (as a database server)
- [NPM](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   https://github.com/rajan153/Voosh-Assignment
   ```

2. **Install Backend Dependencies**

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd Frontend
   npm install
   ```

# Backend

The backend is a Node.js application using Express and MongoDB for the database. It handles task management and email reminders.

## Routes

Here, is two type of routes are here User and Task.

### User

- Register User: POST /api/v1/users/register
- Login User: POST /api/v1/users/login
- Avatar Change: PATCH /api/v1/users/avatar
- Logout: GET /api/v1/users/logout

### Task

- Create Task: POST /api/v1/tasks/create-task
- Get Task: POST /api/v1/tasks/task/:taskId
- Get All Task Change: GET /api/v1/tasks/get-task
- Delete Task: DELETE /api/v1/tasks/delete-task
- Update Task: PATCH /api/v1/tasks/update-task/:taskId
- Update Task Progress: PATCH /api/v1/tasks/update-progress

## Running the Backend

1. **Start the Backend Server:**
   Inside the `Backend` folder, run:

```bash
npm run dev

```

```bash
npm run dev
or
npm run start

```

# Frontend

Below Command to run frontend.

1. **Start the Frontend Server:**
   Inside the `Frontend` folder, run:

```bash
npm run dev

```
