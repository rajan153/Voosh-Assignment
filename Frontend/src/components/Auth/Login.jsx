import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/AuthRoutes/AuthApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { user, loginWithRedirect } = useAuth0();

  const loginSubmit = async (e) => {
    try {
      dispatch(login(e.email, e.password, navigate));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-slate-200">
      <form
        onSubmit={handleSubmit(loginSubmit)}
        className="flex flex-col gap-4 border-2 border-blue-600 rounded-md p-4 shadow-xl items-center justify-center relative"
      >
        <h2 className="font-bold text-blue-600 text-xl absolute left-0 -top-9">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-400 p-1"
          {...register("email", { required: true })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-gray-400 p-1"
            {...register("password", { required: true })}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[6px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#13064b" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#13064b" />
            )}
          </span>
        </div>
        <button type="submit" className="bg-blue-500 text-white w-full py-1">
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
