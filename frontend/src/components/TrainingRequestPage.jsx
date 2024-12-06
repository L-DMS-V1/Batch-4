
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TrainingRequestPage() {
  const { managerId } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:9004/api/manager/${managerId}/request/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("Fetched Requests:", data);
        setRequests(data);
        data.forEach((request) => {
          if (request["status"] === "PENDING") {
            setPendingRequests([...pendingRequests, request]);
          } else {
            setCompletedRequests([...completedRequests, request]);
          }
        });
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const viewDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeDetails = () => {
    setSelectedRequest(null);
  };

  // Handle logout function
  const handleLogout = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Remove the auth token
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="bg-[#E9EFEC] min-h-screen p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#001F3F] to-[#3A6D8C] text-white p-5 flex justify-between items-center shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold tracking-wide">Learning Hub</h1>
  
  {/* "Hey Manager!" text and logout button */}
  <div className="flex items-center space-x-4">
    <span className="text-lg italic">Hey Manager!</span>
    
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-red-700 transition duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m10 0V7m0 9H7"
        />
      </svg>
      <span>Logout</span>
    </button>
  </div>
</header>


      {/* Request Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {["Total Requests", "Completed Requests", "Pending Requests"].map(
          (text, index) => (
            <div
              key={index}
              className="bg-[#6A9AB0] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 border-l-4 border-[#001F3F] hover:border-[#6A9AB0] text-white"
            >
              <h2 className="text-[#001F3F] text-lg font-semibold mb-1">
                {text}
              </h2>
              <p className="text-4xl font-bold text-[#001F3F]">
                {index === 0
                  ? requests.length
                  : index === 1
                  ? requests.filter((req) => req.status === "COMPLETED").length
                  : requests.filter((req) => req.status === "PENDING").length}
              </p>
            </div>
          )
        )}
      </div>

      {/* Create New Request Button */}
      <div className="text-center my-8 flex justify-center gap-10">
        <button
          onClick={() => navigate(`/create-request/${managerId}`)}
          className="bg-[#3A6D8C] text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#001F3F] transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Create New Request
        </button>
        <button
          onClick={() => navigate(`/manager/${managerId}/all-courses`)}
          className="bg-[#3A6D8C] text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#001F3F] transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          View All Courses
        </button>
      </div>

      {/* Request Table */}
      <table className="table-auto w-full bg-white mt-8 shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-[#3A6D8C] to-[#16423C] text-white">
            <th className="px-6 py-4 text-left font-semibold">
              Training Program
            </th>
            <th className="px-6 py-4 text-left font-semibold">Duration</th>
            <th className="px-6 py-4 text-left font-semibold">Status</th>
            <th className="px-6 py-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={index}
              className="hover:bg-[#E9EFEC] transition-colors duration-200 ease-in-out"
            >
              <td className="border px-6 py-4 text-gray-700">
                {request.courseName}
              </td>
              <td className="border px-6 py-4 text-gray-700">
                {request.duration}
              </td>
              <td className="border px-6 py-4">
                <span
                  className={`py-1 px-3 rounded-full text-sm font-semibold ${
                    request.status === "COMPLETED"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="border px-6 py-4 text-center">
                <button
                  onClick={() => viewDetails(request)}
                  className="bg-[#001F3F] text-white px-4 py-2 rounded hover:bg-[#3A6D8C] transition-all duration-200 ease-in-out"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-out border-2 border-[#6A9AB0]">
            <h2 className="text-2xl font-bold mb-6 text-[#001F3F]">
              Request Details
            </h2>
            <p>
              <strong>Training Program:</strong> {selectedRequest.courseName}
            </p>
            <p>
              <strong>Duration:</strong> {selectedRequest.duration}
            </p>
            <p>
              <strong>Employees :</strong>{" "}
              {selectedRequest.requiredEmployees
                .map((employeeId) => `Employee${employeeId}`)
                .join(", ")}
            </p>
            <button
              onClick={closeDetails}
              className="bg-red-500 text-white px-5 py-2 rounded mt-6 hover:bg-red-600 transition-all duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
