import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const EmployeePage = () => {
  const navigate = useNavigate();

  const { employeeId } = useParams(); // Extract employeeId from the route
  const [totalAssigned, setTotalAssigned] = useState([]);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(
          `http://localhost:9004/api/employee/${employeeId}/assignments/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        console.log("Fetched Assignments:", data);

        setTotalAssigned(data); // Update the state with all assignments

        // Calculate counts for ongoing and completed
        const ongoing = data.filter(
          (assignment) => assignment.status === "ONGOING"
        ).length;
        const completed = data.filter(
          (assignment) =>
            assignment.status === "COMPLETED" || assignment.status === "CLOSED"
        ).length;

        setTotalOngoing(ongoing);
        setTotalCompleted(completed);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    if (employeeId) fetchAssignment();
  }, [employeeId, authToken]); // Remove unnecessary dependencies
  // Remove totalAssigned from dependencies

  const handleStartCourse = async (assignment) => {
    try {
      const assignmentId = assignment.assignmentId;
      if (assignment.status == "ASSIGNED") {
        const response = await fetch(
          `http://localhost:9004/api/employee/${employeeId}/assignments/${assignmentId}/start`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alert("Course started successfully!");
          // Update the UI to reflect the course has been started
          // setTotalAssigned(prev =>
          //   prev.map(assignment =>
          //     assignment.assignmentId === assignmentId
          //       ? { ...assignment, status: 'ONGOING' }
          //       : assignment
          //   )
          // );

          navigate(`/${employeeId}/assignment/${assignmentId}`);
        } else {
          const errorData = await response.json();
          alert(`Failed to start course: ${errorData.message}`);
        }
      } else if (assignment.status === "ONGOING") {
        navigate(`/${employeeId}/assignment/${assignmentId}`);
      } else if (assignment.status === "COMPLETED") {
        console.log("hii");
        navigate(`/${employeeId}/feedback/${assignmentId}`);
      }
    } catch (error) {
      console.error("Error starting the course:", error);
      alert("Error starting the course.");
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-[#F7F8F9] text-gray-900"
      } min-h-screen`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800" : "bg-[#001F3F]"
        } flex justify-between items-center px-8 py-6 shadow-xl text-white`}
      >
        <h1 className="text-2xl font-extrabold tracking-widest text-gradient">
          Learning Hub
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 p-3 rounded-full transition-all duration-300 hover:bg-gray-600 text-2xl"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <h1 className="text-lg italic font-medium">Hey Employee</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-12">
          Employee Dashboard
        </h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-gradient-to-br from-[#6A9AB0] via-[#3A6D8C] to-[#001F3F] text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            <p className="text-lg font-semibold">Total Courses Assigned</p>
            <span className="text-5xl font-bold mt-4">
              {totalAssigned.length}
            </span>
          </div>
          <div className="p-8 bg-gradient-to-br from-[#3A6D8C] via-[#6A9AB0] to-[#001F3F] text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            <p className="text-lg font-semibold">Total Courses Ongoing</p>
            <span className="text-5xl font-bold mt-4">{totalOngoing}</span>
          </div>
          <div className="p-8 bg-gradient-to-br from-[#001F3F] via-[#3A6D8C] to-[#6A9AB0] text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            <p className="text-lg font-semibold">Total Courses Completed</p>
            <span className="text-5xl font-bold mt-4">{totalCompleted}</span>
          </div>
        </div>

        {/* Assigned Courses Section */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Assigned Courses
          </h3>
          {totalAssigned.map((assignment) => (
            <div
              key={assignment.assignmentId}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:translate-y-1 transition-all duration-300 ease-in-out border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800">
                  Assignment ID: {assignment.assignmentId}
                </p>
                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                    assignment.status === "ONGOING"
                      ? "bg-yellow-500"
                      : assignment.status === "COMPLETED"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Deadline:</strong> {assignment.deadline}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Progress:</strong>{" "}
                {assignment.courseProgress !== null
                  ? `${(
                      ((assignment.courseProgress.completedModules.split(1)
                        .length -
                        1) *
                        100) /
                      assignment.courseProgress.completedModules.split("")
                        .length
                    ).toFixed(0)}%`
                  : "Not Started"}
              </p>

              <div className="mt-6">
                <button
                  onClick={() => handleStartCourse(assignment)}
                  className={`w-1/4 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out ${
                    assignment.status === "ONGOING"
                      ? "bg-gray-500"
                      : assignment.status === "COMPLETED"
                      ? "bg-green-600 hover:bg-green-700"
                      : assignment.status === "CLOSED"
                      ? "bg-black"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {assignment.status === "ONGOING"
                    ? "Continue"
                    : assignment.status === "COMPLETED"
                    ? "Submit Feedback"
                    : assignment.status === "CLOSED"
                    ? "CLOSED"
                    : "Start Course"}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default EmployeePage;
