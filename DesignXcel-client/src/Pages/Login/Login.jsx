import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { saveUser } from '../../components/SaveUser/SaveUser';

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle google signin
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        saveUser(result.user);
        Swal.fire({
          position: 'top-middle',
          icon: 'success',
          title: 'Log in Successful',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 shadow-md">
        <h2 className="text-2xl text-center text-gray-700 font-bold mb-8">Login</h2>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <AiOutlineUser className="text-gray-400 mx-2" />
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full py-2 px-3 text-gray-700 focus:outline-none`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <span role="alert" className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <AiOutlineLock className="text-gray-400 mx-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full py-2 px-3 text-gray-700 focus:outline-none`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errors.password && <span role="alert" className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        <button type="submit" className="bg-rose-500 w-full rounded-md py-3 text-white">
          {loading ? <FaSpinner className="m-auto animate-spin" size={24} /> : 'Login'}
        </button>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="hover:underline hover:text-rose-500 text-gray-600">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            <Link to="/forgot-password" className="hover:underline hover:text-rose-500">
              Forgot Password?
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center mt-6">
          <div className="border-t border-gray-300 w-16"></div>
          <p className="mx-4 text-sm text-gray-500">or</p>
          <div className="border-t border-gray-300 w-16"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-2 border mt-6 p-2 border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={24} />
          <p>Sign in with Google</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
