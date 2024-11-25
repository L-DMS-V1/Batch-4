import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Requests = () => {
  const { adminId } = useParams();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const authToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        const response = await fetch(
          "http://localhost:9004/api/admin/request/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();

        // Separate requests into pending and completed
        const pending = data.filter((request) => request.status === "PENDING");
        const completed = data.filter(
          (request) => request.status === "COMPLETED"
        );

        // Update the state
        setPendingRequests(pending);
        setCompletedRequests(completed);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const goToCourseCreationPage = (request) => {
    navigate(`/admin/${adminId}/create-course`, {
      state: {
        requestId: request.requestId,
        courseName: request.courseName,
        requiredEmployees: request.requiredEmployees,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 p-8">
      {/* Container */}
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        {/* Pending Requests Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Pending Requests
        </h1>
        {pendingRequests.length === 0 ? (
          <p className="text-xl text-gray-500">
            No pending requests available.
          </p>
        ) : (
          <ul className="space-y-6">
            {pendingRequests.map((request) => (
              <li
                key={request.requestId}
                className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-semibold text-indigo-700">
                  {request.courseName}
                </h3>
                <p className="text-lg text-gray-600">{request.description}</p>
                <p className="text-sm text-gray-500">
                  Duration: {request.duration}
                </p>
                {/* <p className="text-sm text-gray-500">Manager ID: {request.managerId}</p> */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => goToCourseCreationPage(request)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Create Course
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Completed Requests Section */}
        <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">
          Completed Requests
        </h1>
        {completedRequests.length === 0 ? (
          <p className="text-xl text-gray-500">
            No completed requests available.
          </p>
        ) : (
          <ul className="space-y-6">
            {completedRequests.map((request) => (
              <li
                key={request.requestId}
                className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-semibold text-indigo-700">
                  {request.courseName}
                </h3>
                <p className="text-lg text-gray-600">{request.description}</p>
                <p className="text-sm text-gray-500">
                  Duration: {request.duration}
                </p>
                {/* <p className="text-sm text-gray-500">Manager ID: {request.managerId}</p> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
