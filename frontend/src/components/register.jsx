// src/components/Register.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "./api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:9004/api/auth/register",
        {
          userEmail: email,
          name,
          password,
          username,
          role,
        }
      );
      console.log("Registration Successful", response.data);
      navigate("/login"); // Directed to the Login Page after Successful registration
    } catch (error) {
      console.error("Registration Failed", error.response?.data);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <section class="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-[#16423C]">
      <form
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        onSubmit={handleSubmit}
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className=" text-[#16423C] text-center text-xl sm:text-3xl font-semibold">
            Registration
          </h1>
          {error && <p className="text-[#16423C] font-semibold">{error}</p>}
          <div className="w-full mt-8">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your name"
                  required
                />
              </div>
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
              <select
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
              </select>
              <button className="mt-5 tracking-wide font-semibold bg-[#16423C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#6A9C89]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Register</span>
              </button>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <span
                  className="text-[#16423C] font-semibold cursor-pointer"
                  onClick={() => navigate("/login")} // Directed to the registration page
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
