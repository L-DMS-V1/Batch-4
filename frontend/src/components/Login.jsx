// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../service/api";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, {
        userName: username,
        password
      });
      const { token } = response.data; 
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      console.log("Login successful", response.data);
      navigate("/");

    } catch (error) {
      console.error("Login failed", error.response?.data);
      setError("Login Failed. Please try again.");
    }
  };

  return (
    <section class="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-[#3A6D8C]">
      <form
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        onSubmit={handleSubmit}
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-[#001F3F] text-center text-xl sm:text-3xl font-semibold">
            Login
          </h1>
          {error && <p className="text-[#001F3F] font-semibold">{error}</p>}
          <div className="w-full mt-8">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
                required
              />
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span>
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forget Password?
                </a>
              </span>
              <button className="mt-5 tracking-wide font-semibold bg-[#001F3F] text-gray-100 w-full py-4 rounded-lg hover:bg-[#3A6D8C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span className="ml-3">Login</span>
              </button>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Don't have an account?{" "}
                <span
                className="text-[#001F3F] font-semibold cursor-pointer"
                  onClick={() => navigate("/signup")} // Directed to the registration page
                >
                  Register here
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
export default Login;
