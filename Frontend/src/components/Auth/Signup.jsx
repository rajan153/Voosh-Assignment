import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../services/AuthRoutes/AuthApi";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const signupSubmit = (data) => {
    // Used after OTP Verification
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords not match");
      return;
    }
    const signUpData = {
      ...data,
    };

    console.log(signUpData);
    dispatch(signUp(signUpData,navigate));

  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-slate-200">
      <form
        onSubmit={handleSubmit(signupSubmit)}
        className="flex flex-col gap-4 border-2 border-blue-500 rounded-md p-4 shadow-xl items-center justify-center relative"
      >
        <h2 className="font-bold text-blue-500 text-xl absolute left-0 -top-9">
          Signup
        </h2>
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-400 p-1"
          {...register("firstName", { required: true })}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-400 p-1"
          {...register("lastName", { required: true })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-400 p-1"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-400 p-1"
          {...register("password", { required: true })}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="border border-gray-400 p-1"
          {...register("confirmPassword", { required: true })}
        />
        <button type="submit" className="bg-blue-500 text-white w-full py-1">
          Signup
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
        <button className="bg-blue-500 text-white p-1 rounded-lg">
          Signup with Google
        </button>
      </form>
    </div>
  );
}

export default Signup;
