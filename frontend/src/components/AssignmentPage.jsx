
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function AssignmentPage() {
  const navigate = useNavigate();
  const { employeeId, assignmentId } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loadingModules, setLoadingModules] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    setAuthToken(token);
  }, []);

  useEffect(() => {
    const fetchAssignmentDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:9004/api/employee/assignment/${assignmentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch assignment details");
        }
        const data = await response.json();
        setAssignment(data.assignment);
        setCourse(data.course);
        setProgress(data.progress);
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      }
    };
    if (authToken) {
      fetchAssignmentDetail();
    }
  }, [assignmentId, authToken]);

  const handleMarkModuleCompleted = async (moduleIndex) => {
    setLoadingModules((prev) => ({ ...prev, [moduleIndex]: true }));
    try {
      const response = await fetch(
        `http://localhost:9004/api/employee/assignments/${progress.progressId}/complete/${moduleIndex}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to mark module as completed");
      }
      alert(`Module ${moduleIndex + 1} marked as completed!`);
      const updatedCompletedModules = progress.completedModules
        .split("")
        .map((bit, index) => (index === moduleIndex ? "1" : bit))
        .join("");
      setProgress((prev) => ({
        ...prev,
        completedModules: updatedCompletedModules,
      }));
    } catch (error) {
      console.error("Error marking module as completed:", error);
      alert(`Failed to mark module as completed. ${error.message}`);
    } finally {
      setLoadingModules((prev) => ({ ...prev, [moduleIndex]: false }));
    }
  };

  const renderResourceLinks = () => {
    if (!course.resourceLinks || !progress) return null;

    const links = course.resourceLinks.split(",").map((link) => link.trim());
    const completedModules = progress.completedModules.split("");

    return links.map((link, index) => {
      const isCompleted = completedModules[index] === "1";
      const isYouTubeLink =
        link.includes("youtube.com/watch") || link.includes("youtu.be");
      const videoId = isYouTubeLink
        ? link.includes("watch")
          ? new URLSearchParams(new URL(link).search).get("v")
          : link.split("/").pop()
        : null;

      return (
        <div key={index} className="mb-8 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="mb-4">
            {isYouTubeLink ? (
              <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center group"
              >
                <span className="underline underline-offset-4">{link}</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-medium text-gray-600">
              Module {index + 1}
            </span>
            {isCompleted ? (
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Completed
              </span>
            ) : (
              <button
                onClick={() => handleMarkModuleCompleted(index)}
                className={`inline-flex items-center px-6 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 ${
                  loadingModules[index]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#6A9AB0] hover:bg-[#3A6D8C] hover:shadow-md"
                }`}
                disabled={loadingModules[index]}
              >
                {loadingModules[index] ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mark as Complete
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  const calculateProgress = () => {
    if (!progress) return 0;
    return ((progress.completedModules.split("1").length - 1) * 100.0) / progress.completedModules.split("").length;
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-lightGray to-lightBlue py-12">
  <div className="container mx-auto max-w-4xl px-4">
    <div className="bg-lightBlue rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-darkBlue px-6 py-8 text-white">
<button
  onClick={() => navigate(-1)}
  className="absolute left-6 top-6 bg-accentBlue text-white p-3 rounded-full hover:bg-mediumBlue transition-colors flex items-center justify-center"
>
  <FontAwesomeIcon icon={faArrowLeft} />
</button>


        <h1 className="text-3xl font-bold text-center">Assignment Details</h1>
      </div>

      <div className="p-6 space-y-8">
        {assignment ? (
          <div className="bg-lightGray rounded-xl p-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold text-mediumBlue mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-accentBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Assignment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-mediumBlue font-medium">Deadline:</span>
                <span className="text-darkBlue">{assignment.deadline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-mediumBlue font-medium">Status:</span>
                <span className="text-darkBlue">{assignment.status}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="h-32 bg-lightGray rounded-xl"></div>
          </div>
        )}

        {course ? (
          <div className="bg-lightGray rounded-xl p-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold text-mediumBlue mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-accentBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Course Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-mediumBlue font-medium">Name:</span>
                  <p className="text-darkBlue mt-1">{course.courseName}</p>
                </div>
                <div>
                  <span className="text-mediumBlue font-medium">Duration:</span>
                  <p className="text-darkBlue mt-1">{course.duration}</p>
                </div>
              </div>
              <div>
                <span className="text-mediumBlue font-medium">Key Concepts:</span>
                <p className="text-darkBlue mt-1">{course.keyConcepts}</p>
              </div>
              <div>
             <h3 className="text-lg font-medium" style={{ color: '#001F3F', marginBottom: '1rem' }}>Resources</h3>
               <div className="space-y-4" style={{ backgroundColor: '#E9EFEC', color: '#3A6D8C' }}>
    {renderResourceLinks()}
  </div>
</div>

            </div>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="h-32 bg-lightGray rounded-xl"></div>
          </div>
        )}



            {progress ? (
              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Progress Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-medium">Completion Progress</span>
                      <span className="text-blue-600 font-semibold">
                        {calculateProgress().toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${calculateProgress()}%` }}
                      ></div>
                    </div>
                  </div>

                  </div>
                </div>

            ) : (
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
              </div>
            )}


            {/* Loading States */}
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
                Object.values(loadingModules).some((loading) => loading)
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                  <span className="text-gray-700 font-medium">
                    Updating progress...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Toast Notification */}
        <div
          className="fixed bottom-4 right-4 max-w-md bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out"
          style={{
            transform: "translateX(150%)",
          }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">Error updating progress. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}