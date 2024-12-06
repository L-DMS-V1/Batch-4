import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ handleLogin }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(location.state?.message || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9004/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role, username, email, id } = data;

        Cookies.set("authToken", token, { expires: 1 });

        handleLogin(username, role);
        console.log("hi" + role);
        if (role == "Manager") {
          navigate(`/training-requests/${id}`); // Redirect to manager's page
        } else if (role == "Employee") {
          navigate(`/employee-dashboard/${id}`); // Redirect to employee's page
        } else if (role == "Admin") {
          navigate(`/admin-dashboard/${id}`); // Redirect to admin's page
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#E9EFEC]">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/214/433/original/education-design-with-people-studying-documents-vector.jpg"
            alt="Placeholder"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-[#001F3F]">Login</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 text-[#001F3F]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full bg-[#f7f7f7] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 text-[#001F3F]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full bg-[#f7f7f7] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#3A6D8C] text-white py-2 rounded-md hover:bg-[#6A9AB0] transition duration-150 ease-in-out"
            >
              Login
            </button>
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
             
              <Link to="/signup" className="text-[#001F3F] font-semibold underline hover:text-blue-500">Signup</Link>

            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
