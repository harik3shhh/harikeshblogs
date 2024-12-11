import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import { ThemeContext } from '../../context/ThemeContext';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {theme}  = useContext(ThemeContext)


  //o
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  //o handle input
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value
    });
  }

  //o handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!input.email) { toast.error("email address is required !"); return; }
    if (!input.password) { toast.error("password is required !"); return; }


    try {

      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, input);

      if (data?.success) {
        setInput({ email: "", password: "" });
        toast.success("Login Successful !")

        setAuth({
          ...auth,
          user: data.user,
          token: data?.token,
        });

        localStorage.setItem("auth", JSON.stringify(data));
        navigate(location.state || "/")
      } else {
        toast.error("Invalid email or password !");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div
        className={`flex justify-center items-center m-4 min-h-screen rounded-lg `}>
        <div className={` rounded-lg shadow-2xl p-6 lg:p-8 w-full max-w-md`}>
          <h2 className={`${theme==="dark"?"text-white":"text-black"} text-2xl font-crimson font-bold mb-6 text-center `}>LOGIN</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={input.email}
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={input.password}
                onChange={handleInput}
                className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-end font-bold text-black"
                style={{ bottom: "8px" }}
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <p className={`${theme==="dark"?"text-white":"text-black"}`}>
              New user? <NavLink to="/register" className="text-blue-600 hover:text-blue-500">Sign up</NavLink>
            </p>
            <p className="text-white">
              <NavLink to="/forgot-password" className="text-blue-600 hover:text-blue-500">Forgot Password?</NavLink>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
