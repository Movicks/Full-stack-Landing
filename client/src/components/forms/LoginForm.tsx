import React, { useState } from "react";
import { login } from "../../features/auth/authThunks";
import { loginSchema } from "../../libs/authschema/AuthSchemas";
import { useAppDispatch } from "../../store/storeHooks";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ImEye, ImEyeBlocked } from "react-icons/im";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch(); // Using the typed dispatch
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);
      const resultAction = await dispatch(login(formData));

      // Check if the login was fulfilled
      if (login.fulfilled.match(resultAction)) {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="username" className="text-gray-500">
          Email
        </label>
        <div className="w-full h-[3rem] border-2 border-gray-500 flex flex-col shadow-custom">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full h-full bg-transparent outline-none px-2 text-gray-500"
          />
        </div>
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="username" className="text-gray-500">
          Password
        </label>
        <div className="w-full h-[3rem] border-2 gap-3 border-gray-500 flex items-center justify-between shadow-custom">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="****"
            className="w-full h-full bg-transparent outline-none px-2 text-gray-500"
          />
          <div
            onClick={togglePasswordVisibility}
            className="cursor-pointer w-9"
          >
            {showPassword ? (
              <ImEyeBlocked className="text-xl text-gray-500" />
            ) : (
              <ImEye className="text-xl text-gray-500" />
            )}
          </div>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full h-[3rem] bg-red-500 text-center text-white uppercase mt-5 font-bold"
      >
        Login
      </button>
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Don't have an account?</span>
        <Link to="/signup" className="text-red-500 underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
