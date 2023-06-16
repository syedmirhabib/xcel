import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Handle google signin
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "User Logged in Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      console.log(data);

      // Update user profile
      // ...

      Swal.fire({
        position: "top-middle",
        icon: "success",
        title: "User created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-blue-500"
            />
            {errors.name && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-3 py-2 rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-blue-500`}
            />
            {errors.email && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\W).+$/,
                  message:
                    "Password must contain at least one capital letter and one special character",
                },
              })}
              className={`w-full px-3 py-2 rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-blue-500`}
            />
            {errors.password && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full px-3 py-2 rounded border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-blue-500`}
            />
            {errors.confirmPassword && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 mt-4 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={16} />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center mt-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Signup with social accounts</p>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center mt-4 space-x-2 border border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={20} />
          <p>Continue with Google</p>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:underline"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
