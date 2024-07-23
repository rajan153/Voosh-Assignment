import React from "react";
import IconBtn from "./IconBtn";

function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-white p-6 flex flex-col items-center justify-center shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px]">
        <p className="text-2xl font-semibold text-richblack-900">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200 text-center">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4 ">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-richblack-700 text-black hover:bg-richblack-800 py-[8px] px-[20px] font-semibold border hover:border-gray-400"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;