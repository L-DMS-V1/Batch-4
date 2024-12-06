
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        setTotalAssigned(data); // Update the state with all assignments

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
  }, [employeeId, authToken]);

  const handleLogout = () => {
    // Clear authentication token or session if needed
    document.cookie = "authToken=; max-age=0"; // Clear the token
    navigate("/login"); // Redirect to login page
  };

  const handleStartCourse = async (assignment) => {
    try {
      const assignmentId = assignment.assignmentId;
      if (assignment.status === "ASSIGNED") {
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
          navigate(`/${employeeId}/assignment/${assignmentId}`);
        } else {
          const errorData = await response.json();
          alert(`Failed to start course: ${errorData.message}`);
        }
      } else if (assignment.status === "ONGOING") {
        navigate(`/${employeeId}/assignment/${assignmentId}`);
      } else if (assignment.status === "COMPLETED") {
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
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 p-3 rounded-full transition-all duration-300 hover:bg-gray-600 text-2xl"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <p className="text-xl text-white italic">Hi Employee!</p>
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

      {/* Main Content */}
      <main className="p-8">
        <section className="bg-lightBlue py-6 text-center">
          <h2 className="text-4xl font-extrabold text-darkBlue">Employee Dashboard</h2>
        </section>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-gradient-to-br from-[#6A9AB0] via-[#3A6D8C] to-[#001F3F] text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            <p className="text-lg font-semibold">Total Courses Assigned</p>
            <span className="text-5xl font-bold mt-4">{totalAssigned.length}</span>
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
          <h3 className="text-2xl font-bold text-darkBlue mb-6">Assigned Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {totalAssigned.map((assignment) => (
              <div
                key={assignment.assignmentId}
                className="p-6 bg-lightBlue rounded-lg shadow-lg border-t-4 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{
                  borderColor:
                    assignment.status === "ONGOING"
                      ? "#6A9AB0" // accentBlue
                      : assignment.status === "COMPLETED"
                      ? "#001F3F" // darkBlue
                      : "#3A6D8C", // mediumBlue
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold text-darkBlue">
                    Assignment ID: {assignment.assignmentId}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      assignment.status === "ONGOING"
                        ? "bg-accentBlue"
                        : assignment.status === "COMPLETED"
                        ? "bg-darkBlue"
                        : assignment.status === "CLOSED"
                        ? "bg-black"
                        : "bg-mediumBlue"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>

                {/* Assignment Details */}
                <p className="text-sm text-mediumBlue mb-2">
                  <strong>Deadline:</strong> {assignment.deadline}
                </p>
                <p className="text-sm text-mediumBlue">
                  <strong>Progress:</strong>{" "}
                  {assignment.courseProgress
                    ? `${(
                        ((assignment.courseProgress.completedModules.split(1).length - 1) *
                          100) /
                        assignment.courseProgress.completedModules.split("").length
                      ).toFixed(0)}%`
                    : "Not Started"}
                </p>

                {/* Action Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleStartCourse(assignment)}
                    className={`w-full py-2 rounded-md text-white font-semibold transition-all duration-300 ${
                      assignment.status === "ONGOING"
                        ? "bg-mediumBlue hover:bg-accentBlue"
                        : assignment.status === "COMPLETED"
                        ? "bg-darkBlue hover:bg-mediumBlue"
                        : "bg-accentBlue hover:bg-darkBlue"
                    }`}
                    disabled={assignment.status === "CLOSED"} // Disable button for completed courses
                  >
                    {assignment.status === "ONGOING"
                      ? "Continue"
                      : assignment.status === "COMPLETED"
                      ? "Submit Feedback"
                      :assignment.status === "CLOSED"
                      ? "Closed" // Show 'Completed' when course is finished
                      : "Start"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmployeePage;
