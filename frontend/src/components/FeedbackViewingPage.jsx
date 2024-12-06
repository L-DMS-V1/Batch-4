

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const FeedbackViewingPage = () => {
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
    <div className="min-h-screen bg-lightGray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:px-10 relative">
            {/* Back Arrow Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 top-6 bg-accentBlue text-white p-3 rounded-full hover:bg-mediumBlue transition-colors"
            >
              <ArrowLeftIcon size={28} />
            </button>

            <h1 className="text-5xl font-extrabold text-darkBlue mb-4 text-center">
              Course Feedback
            </h1>
            <p className="text-xl font-semibold text-gray-600 text-center mb-8">
              View feedback for all available courses
            </p>

            <div className="space-y-8">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-extrabold text-accentBlue mb-4">
                    {course.courseName}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    This course is designed to give you a comprehensive understanding of its subject.
                  </p>
                  <button
                    onClick={() => handleViewFeedback(course.courseId)}
                    className="bg-accentBlue text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-mediumBlue transition-colors"
                  >
                    View Feedback
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackViewingPage;
