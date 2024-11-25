import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { employeeId, assignmentId } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      rating,
      comment,
    };

    try {
      const response = await fetch(
        `http://localhost:9004/api/employee/feedback/${assignmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Add authorization header
          },
          body: JSON.stringify(feedbackData),
        }
      );
      //   const data = await response.json();
      console.log(response);
      if (!response.ok) {
        console.log("byeee");
        throw error(data);
      }

      setMessage("Feedback submitted successfully!");
      //   setTimeout(()=>{}, 1000)
      navigate(`/${employeeId}/assignment/${assignmentId}`);
      console.log("what");
    } catch (error) {
      setMessage("Failed to submit feedback. Please try again later.");
      //   console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-teal-700 mb-6">
          Submit Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="rating">
            <label className="text-lg font-semibold text-gray-700">
              Rating (out of 5 stars):
            </label>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    className="cursor-pointer text-3xl"
                    style={{
                      color:
                        starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <label
              htmlFor="comment"
              className="text-lg font-semibold text-gray-700"
            >
              Comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Submit Feedback
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && (
          <p className="mt-6 text-lg text-center text-green-500 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
