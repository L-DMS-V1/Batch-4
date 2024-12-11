
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleIcon, ClockIcon, ArrowLeftIcon } from "lucide-react";

const Requests = () => {
  const { adminId } = useParams();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [selectedTab, setSelectedTab] = useState("pending");
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

        const pending = data.filter((request) => request.status === "PENDING");
        const completed = data.filter(
          (request) => request.status === "COMPLETED"
        );

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

  const renderRequestList = (requests, isPending = false) => {
    if (requests.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-10 bg-lightGray rounded-xl">
          <p className="text-xl text-gray-500 text-center">
            {isPending
              ? "No pending training requests at the moment"
              : "All completed training requests will appear here"}
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request.requestId}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-extrabold text-accentBlue truncate max-w-[80%]">
                {request.courseName}
              </h3>
              {isPending ? (
                <ClockIcon className="text-mediumBlue" size={24} />
              ) : (
                <CheckCircleIcon className="text-darkBlue" size={24} />
              )}
            </div>
            <p className="text-lg text-gray-600 mb-3 line-clamp-3">{request.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-semibold text-gray-500">
                Duration: {request.duration}
              </span>
              {isPending && (
                <button
                  onClick={() => goToCourseCreationPage(request)}
                  className="bg-accentBlue text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-mediumBlue transition-colors"
                >
                  Create Course
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-lightGray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:px-10 relative">
            {/* Back Arrow Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 top-6 bg-darkBlue text-white p-3 rounded-full hover:bg-mediumBlue transition-colors"
            >
              <ArrowLeftIcon size={28} />
            </button>

            <h1 className="text-5xl font-extrabold text-darkBlue mb-4 text-center">
              Training Requests
            </h1>
            <p className="text-xl font-semibold text-gray-600 text-center mb-8">
              Manage and track your organization's training initiatives
            </p>

            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg bg-lightBlue p-1">
                <button
                  onClick={() => setSelectedTab("pending")}
                  className={`px-8 py-3 rounded-lg transition-all text-xl font-semibold ${
                    selectedTab === "pending"
                      ? "bg-darkBlue text-white"
                      : "text-darkBlue hover:bg-lightBlue"
                  }`}
                >
                  Pending Requests
                </button>
                <button
                  onClick={() => setSelectedTab("completed")}
                  className={`px-8 py-3 rounded-lg transition-all text-xl font-semibold ${
                    selectedTab === "completed"
                      ? "bg-darkBlue text-white"
                      : "text-darkBlue hover:bg-lightBlue"
                  }`}
                >
                  Completed Requests
                </button>
              </div>
            </div>

            {selectedTab === "pending"
              ? renderRequestList(pendingRequests, true)
              : renderRequestList(completedRequests)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;

