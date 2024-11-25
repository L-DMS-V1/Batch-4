import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedbackViewingPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        const response = await fetch(
          "http://localhost:9004/api/admin/courses/all",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleViewFeedback = (courseId) => {
    navigate(`/course-feedback/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-300">
        <h2 className="text-4xl font-extrabold text-teal-700 mb-8">
          All Courses
        </h2>

        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">
                {course.courseName}
              </h3>

              <div className="flex justify-end">
                <button
                  onClick={() => handleViewFeedback(course.courseId)}
                  className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  View Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
