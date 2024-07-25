import React, { useEffect, useState } from "react";
import AddTodo from "../components/Task/AddTask";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/Auth/Login";
import { getAllTask, updateProgress } from "../services/TaskRoutes/TaskApi";
import TaskCard from "../components/Task/TaskCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { searchTasks } from "../slices/taskSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState("asc");
  const [open, setOpen] = useState(false);
  const [draggableId, setDraggableId] = useState(null);
  const [destinationId, setDestinationId] = useState(null);
  const [editCardOpen, setEditCardOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { searchResults } = useSelector((state) => state.task);

  const { token } = useSelector((state) => state.auth);
  const { createdTodos, processingTodos, completedTodos } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(updateProgress(draggableId, destinationId, token));
    dispatch(getAllTask(sortValue, token));
  }, [
    open,
    sortValue,
    draggableId,
    destinationId,
    editCardOpen,
    confirmationModal,
  ]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      createTodo = [createdTodos],
      activeTodos = [processingTodos],
      completeTodos = [completedTodos];

    if (source.droppableId === "Todos") {
      setDraggableId(draggableId);
      setDestinationId(destination.droppableId);

      add = createTodo[source.index];
      createTodo.splice(source.index, 1);

      if (destination.droppableId === "Todos") {
        createTodo.splice(destination.index, 0, add);
      } else if (destination.droppableId === "In-Progress") {
        activeTodos.splice(destination.index, 0, add);
      } else if (destination.droppableId === "Done") {
        completeTodos.splice(destination.index, 0, add);
      }
    } else if (source.droppableId === "In-Progress") {
      setDraggableId(draggableId);
      setDestinationId(destination.droppableId);

      add = activeTodos[source.index];
      activeTodos.splice(source.index, 1);

      if (destination.droppableId === "Todos") {
        createTodo.splice(destination.index, 0, add);
      } else if (destination.droppableId === "In-Progress") {
        activeTodos.splice(destination.index, 0, add);
      } else if (destination.droppableId === "Done") {
        completeTodos.splice(destination.index, 0, add);
      }
    } else if (source.droppableId === "Done") {
      setDraggableId(draggableId);
      setDestinationId(destination.droppableId);

      add = completeTodos[source.index];
      completeTodos.splice(source.index, 1);

      if (destination.droppableId === "Todos") {
        createTodo.splice(destination.index, 0, add);
      } else if (destination.droppableId === "In-Progress") {
        activeTodos.splice(destination.index, 0, add);
      } else if (destination.droppableId === "Done") {
        completeTodos.splice(destination.index, 0, add);
      }
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    dispatch(searchTasks(e.target.value));
  };

  useEffect(() => {}, [query]);

  return (
    <div>
      {!token ? (
        <Login />
      ) : (
        <div>
          <div className="flex p-4 items-center justify-between flex-wrap">
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              Add Task
            </button>
            {open && <AddTodo setOpen={setOpen} />}
            <div>
              <label className="ml-4" for="sortOrder">
                Sort by:
              </label>
              <select
                className="border border-gray-500 ml-4"
                onChange={(e) => setSortValue(e.target.value)}
                value={sortValue}
                id="sortOrder"
                name="sortOrder"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <form className="ml-4 flex gap-4 relative">
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search by title or description"
                  className="border border-gray-500 p-1"
                />
              </form>
              {searchResults.length !== 0 && query !== "" && (
                <div>
                  {searchResults.map((data) => (
                    <div className="absolute bg-white p-4 border shadow-md">
                      <h2 className="font-bold text-xl">{data.title}</h2>
                      <p className="font-light text-sm">{data.description}</p>
                      <p className="font-light">
                        <span className="font-bold">Due: </span> {data.dueDate}
                      </p>
                      <p className="font-light">
                        <span className="font-bold">CreatedBy: </span>{" "}
                        {data.createdBy}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-wrap items-start justify-center p-4 border gap-4">
              <Droppable droppableId="Todos">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`border p-4 flex flex-col items-center gap-4 bg-red-200 w-[375px] ${
                      snapshot.isDraggingOver ? "bg-red-300" : ""
                    }`}
                  >
                    <h3 className="font-bold text-lg">TODO</h3>
                    {createdTodos.map((task, index) => (
                      <TaskCard
                        confirmationModal={confirmationModal}
                        setConfirmationModal={setConfirmationModal}
                        editCardOpen={editCardOpen}
                        setEditCardOpen={setEditCardOpen}
                        key={index}
                        index={index}
                        data={task}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="In-Progress">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`border p-4 flex flex-col items-center gap-4 bg-yellow-100 w-[375px] ${
                      snapshot.isDraggingOver ? "bg-yellow-200" : ""
                    }`}
                  >
                    <h3 className="font-bold text-lg">IN PROGRESS</h3>
                    {processingTodos.map((task, index) => (
                      <TaskCard
                        confirmationModal={confirmationModal}
                        setConfirmationModal={setConfirmationModal}
                        editCardOpen={editCardOpen}
                        setEditCardOpen={setEditCardOpen}
                        key={index}
                        index={index}
                        data={task}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="Done">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`border p-4 flex flex-col items-center gap-4 bg-green-100 w-[375px] ${
                      snapshot.isDraggingOver ? "bg-green-200" : ""
                    }`}
                  >
                    <h3 className="font-bold text-lg">DONE</h3>
                    {completedTodos.map((task, index) => (
                      <TaskCard
                        confirmationModal={confirmationModal}
                        setConfirmationModal={setConfirmationModal}
                        editCardOpen={editCardOpen}
                        setEditCardOpen={setEditCardOpen}
                        key={index}
                        index={index}
                        data={task}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
