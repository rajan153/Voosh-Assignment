import React from "react";
import AddTodo from "../components/Task/AddTask";
import { useSelector } from "react-redux";
import Login from "../components/Auth/Login";

function Dashboard() {
  const { token } = useSelector((state) => state.auth);
  return (
    <div>
      {!token ? (
        <Login />
      ) : (
        <div>
          <AddTodo />
          <div className="flex flex-wrap justify-between p-4 border">
            <div className="border p-4 w-[30%] flex flex-col items-center">
              <h3>TODO</h3>
            </div>
            <div className="border p-4 w-[30%] flex flex-col items-center">
              <h3>IN PROGRESS</h3>
            </div>
            <div className="border p-4 w-[30%] flex flex-col items-center">
              <h3>DONE</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
