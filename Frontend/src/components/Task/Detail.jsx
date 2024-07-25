import React from "react";

function Detail({ setDetailCardOpen, data }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-white p-6 flex flex-col items-start justify-center shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px] gap-4">
        <h2 className="text-xl font-bold self-center underline">View Card</h2>
        <h2 className="font-bold text-xl">{data.title}</h2>
        <p className="font-light text-sm">{data.description}</p>
        <p className="font-light">
          <span className="font-bold">Due: </span> {data.dueDate}
        </p>
        <p className="font-light">
          <span className="font-bold">CreatedBy: </span> {data.createdBy}
        </p>

        <button
          onClick={() => setDetailCardOpen(false)}
          className="self-end cursor-pointer rounded-md bg-richblack-700 text-black hover:bg-richblack-800 py-[8px] px-[20px] font-semibold border hover:border-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Detail;
