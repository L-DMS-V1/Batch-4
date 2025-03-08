
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // Importing the arrow icon
import "chart.js/auto";
import toast from "react-hot-toast";

export default function CourseFeedbackPage() {
  const { courseId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const authToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        const response = await fetch(
          `http://localhost:9004/api/admin/feedbacks/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);

          // Calculate average rating
          const totalRatings = data.reduce(
            (sum, feedback) => sum + feedback.rating,
            0
          );
          setAverageRating((totalRatings / data.length).toFixed(2));

          // Calculate rating distribution
          const distribution = data.reduce((acc, feedback) => {
            acc[feedback.rating] = (acc[feedback.rating] || 0) + 1;
            return acc;
          }, {});
          setRatingDistribution(distribution);
        } else {
          toast.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        toast.error("Error fetching feedbacks:", error.message);
      }
    };

    fetchFeedbacks();
  }, [courseId]);

  const pieChartData = {
    labels: Object.keys(ratingDistribution),
    datasets: [
      {
        label: "Rating Distribution",
        data: Object.values(ratingDistribution),
        backgroundColor: ["#8ECAE6", "#219EBC", "#023047", "#FFB703", "#FB8500"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-300">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-gray-700 to-gray-800 text-white text-center py-8">
          {/* Back Button with Arrow in Circle */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="absolute left-6 top-6 bg-accentBlue text-white p-3 rounded-full hover:bg-mediumBlue transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" /> {/* Arrow Icon */}
          </button>

          <h1 className="text-4xl font-extrabold tracking-wide">Course Feedback</h1>
          <p className="mt-4 text-lg font-medium">
            Average Rating:{" "}
            <span className="text-yellow-400">
              {isNaN(averageRating) ? "No feedbacks yet" : averageRating}
            </span>
          </p>
        </div>

        <div className="p-10">
          {/* Main Content Section */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Chart Section */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-6 shadow-lg rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Rating Distribution
              </h3>
              <Pie data={pieChartData} />
            </div>

            {/* Feedback Section */}
            <div className="w-full lg:w-1/2 max-h-96 overflow-y-auto bg-gray-50 p-6 shadow-lg rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                User Comments
              </h3>
              <div className="grid gap-6">
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <div
                      key={feedback.feedbackId}
                      className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:scale-[1.02] transform transition-all"
                    >
                      <p className="text-gray-800 font-medium mb-2">
                        <strong>Rating:</strong> {feedback.rating}
                      </p>
                      <p className="text-gray-600">
                        <strong>Comment:</strong> {feedback.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No feedbacks available yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
