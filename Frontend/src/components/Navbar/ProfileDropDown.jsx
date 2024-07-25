import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut, VscAccount } from "react-icons/vsc";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../services/AuthRoutes/AuthApi";
import ConfirmationModal from "../Common/ConfirmationModal";
import AvatarChange from "./AvatarChange";

function ProfileDropDown() {
  const { registerData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [profileModal, setProfileModal] = useState(false);

  useOnClickOutside(ref, () => setOpen(false));

  if (!registerData) return null;

  return (
    <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
      {profileModal && (
        <AvatarChange setProfileModal={setProfileModal} setOpen={setOpen} />
      )}
      <div className="flex items-center gap-x-1">
        <img
          src={registerData?.avatar}
          alt={`profile-${registerData?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-white"
          ref={ref}
        >
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => setProfileModal(true)}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscAccount className="text-lg" size={22} />
            Profile Change
          </div>
          <div className="flex flex-col">
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>

          {confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
