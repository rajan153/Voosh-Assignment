import React from "react";
import logo from "/task.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "./ProfileDropDown";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  
  return (
    <div className="bg-slate-950 p-2 flex justify-between items-center">
      <Link to={"/"} className="hover:cursor-pointer">
        <img src={logo} alt="Navbar logo" width={40} loading="lazy" />
      </Link>
      {token === null && (
        <div className="flex gap-4">
          <Link
            to={"/login"}
            className="hidden md:block border border-[#13064b] bg-white px-[12px] py-[8px] text-[#13064b] rounded-md hover:bg-[#13064b] hover:text-white"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="hidden md:block border border-[#13064b] bg-white px-[12px] py-[8px] text-[#13064b] rounded-md hover:bg-[#13064b] hover:text-white"
          >
            Signup
          </Link>
        </div>
      )}
      {token !== null && <ProfileDropDown />}
    </div>
  );
}

export default Navbar;
