import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      console.log("Attempting login with:", data);
      const res = await login(data).unwrap();
      
      console.log("Login response:", res);
      dispatch(setCredentials(res));
      reset();
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error details:", err);
      
      if (err.status === 401) {
        toast.error("Invalid email or password");
      } else if (err.status === 400) {
        toast.error("Validation error: Please check your inputs");
      } else if (err.status === 500) {
        toast.error("Server error: Please try again later");
      } else {
        toast.error(err?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base dark:border-gray-700 dark:text-blue-400 border-gray-300 text-gray-600'>
              Manage all your tasks in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center dark:text-gray-400 text-blue-700'>
              <span>Cloud-based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14 rounded-xl shadow-lg'
            noValidate
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center dark:text-blue-400'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 dark:text-gray-400'>
                Keep all your credentials safe!
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='you@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <div className="relative">
                <Textbox
                  placeholder='••••••••'
                  type={showPassword ? "text" : "password"}
                  name='password'
                  label='Password'
                  className='w-full rounded-full pr-10'
                  register={register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  error={errors.password ? errors.password?.message : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <span className='text-sm text-gray-600 hover:underline cursor-pointer dark:text-gray-400'>
                Forgot Password?
              </span>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                label='Log in'
                className='w-full h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-200'
                disabled={isLoading}
              />
            )}
            <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
              Don't have an account?{' '}
              <span 
                className='text-blue-600 hover:underline cursor-pointer dark:text-blue-400'
                onClick={() => navigate('/signup')}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;