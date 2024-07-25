import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { CiViewBoard } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../services/TaskRoutes/TaskApi";
import Detail from "./Detail";
import EditCard from "./EditCard";
import ConfirmationModal from "../Common/ConfirmationModal";

function TaskCard({
  data,
  index,
  setEditCardOpen,
  editCardOpen,
  confirmationModal,
  setConfirmationModal,
}) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [detailCardOpen, setDetailCardOpen] = useState(false);

  return (
    <div>
      <Draggable draggableId={data._id} index={index} key={data._id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="border border-gray-800 rounded-lg p-4 w-full leading-7 break-all bg-white shadow-xl"
          >
            <h2 className="font-bold text-xl">{data.title}</h2>
            <p className="font-light text-sm">{data.description}</p>
            <p className="font-light">
              <span className="font-bold">Due: </span> {data.dueDate}
            </p>
            <p className="font-light">
              <span className="font-bold">CreatedBy: </span> {data.createdBy}
            </p>
            <div className="flex gap-5 justify-end mt-8 cursor-pointer">
              <MdDelete
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "Task will be deleted.",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => {
                      dispatch(
                        dispatch(
                          deleteTask(data._id, token, setConfirmationModal)
                        )
                      );
                    },
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="bg-red-300 rounded-full p-1 cursor-pointer"
                size={25}
              />
              <FaRegEdit
                onClick={() => setEditCardOpen(true)}
                className="bg-blue-300 rounded-full p-1 cursor-pointer"
                size={25}
              />
              <CiViewBoard
                className="bg-pink-300 rounded-full p-1 cursor-pointer"
                size={25}
                onClick={() => setDetailCardOpen(true)}
              />
            </div>
          </div>
        )}
      </Draggable>
      {detailCardOpen && (
        <Detail setDetailCardOpen={setDetailCardOpen} data={data} />
      )}
      {editCardOpen && (
        <EditCard setEditCardOpen={setEditCardOpen} data={data} />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default TaskCard;
