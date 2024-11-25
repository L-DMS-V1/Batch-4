import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function CourseFeedbackPage() {
  const { courseId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});

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
          console.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
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
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Course Feedback
        </h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          Average Rating:{" "}
          <span className="text-indigo-600">
            {isNaN(averageRating) ? "No feedbacks yet" : averageRating}
          </span>
        </h3>

        {/* Pie Chart Section */}
        <div className="w-full flex justify-center mb-8">
          <div className="bg-gray-50 p-4 rounded-xl shadow-md w-full max-w-md">
            <Pie data={pieChartData} />
          </div>
        </div>

        {/* Feedbacks Section */}
        <div className="overflow-y-auto max-h-[300px] border border-gray-300 rounded-lg p-4 mt-6 bg-gray-50 shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Comments:
          </h4>
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.feedbackId}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-lg font-medium text-gray-800">
                  <strong>Rating:</strong> {feedback.rating}
                </p>
                <p className="text-gray-600">
                  <strong>Comment:</strong> {feedback.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
