import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [managerId, setManagerId] = useState();
  const [managers, setManagers] = useState([]);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  
  const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];


  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch("http://localhost:9004/api/admin/managers/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }); // Replace with actual endpoint
        if (response.ok) {
          const data = await response.json();
          setManagers(
            data.map((manager) => ({
              value: manager.managerId,
              label: `Manager ID: ${manager.managerId}`, // Adjust based on your manager object structure
            }))
          );
        } else {
          console.error("Failed to fetch managers");
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    if (role === "employee") {
      fetchManagers();
      console.log(managers)
    }
  }, [role]);


  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;
    const hasNumber = /[0-9]/;

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasSymbol.test(password)) {
      return "Password must contain at least one symbol.";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }

    return ""; // No errors
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const validationError = validatePassword(value);
    setPasswordError(validationError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setError("");
    setSuccess("");

    

    try {
      let response;
      if(role == "employee"){
        response = await fetch("http://localhost:9004/api/auth/register/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            username,
            email,
            password,
            role,
            managerId
          }),
        });  
      }else if(role == "manager"){
        response = await fetch("http://localhost:9004/api/auth/register/manager", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            username,
            email,
            password,
            role,
          }),
        });
      }
      
      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setError("")
        
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create account.");
      }
    } catch (error) {
      setError("Error creating account. Please try again." + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9EFEC] p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-[#001F3F] text-center">
        Sign Up
      </h2>
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          {role === "employee" && (
            <div className="my-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="managerId"
              >
                Assigned Manager
              </label>
              <select
                id="managerId"
                value={managerId || ""}
                onChange={(e) => setManagerId(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="" disabled>
                  Select a manager...
                </option>
                {managers.map((manager) => (
                  <option key={manager.value} value={manager.value}>
                    {manager.label}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>
        <button
          type="submit"
          className="w-full bg-[#3A6D8C] text-white py-3 rounded-lg hover:bg-[#6A9AB0] transition duration-200"
        >
          Create Account
        </button>
        
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default Signup;
