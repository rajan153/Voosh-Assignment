import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { updateAvatar } from "../../services/AuthRoutes/AuthApi";

function AvatarChange({ setProfileModal, setOpen }) {
  const { registerData, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", imageFile);

      dispatch(updateAvatar(formData, token)).then(() => {
        setLoading(false);
        setProfileModal(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-white p-6 flex flex-col items-center justify-center shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px] gap-4">
        <p>Change Profile Picture</p>
        <img
          src={previewSource || registerData?.avatar}
          alt={`profile-${registerData?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="flex flex-row gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden border-0"
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="flex gap-4 mt-4 border-0">
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 border hover:border-slate-400"
            >
              Select
            </button>
            <button
              onClick={handleFileUpload}
              className="rounded-[8px] bg-[#13064b] py-[8px] px-[12px] font-medium text-white shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px] hover:bg-[#2e7fef] flex gap-2"
            >
              {loading ? "Uploading..." : "Upload"}
              {!loading && <FiUpload className="text-lg text-gray-300" />}
            </button>
            <button
              onClick={() => setProfileModal(false)}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 border hover:border-slate-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarChange;
