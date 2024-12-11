
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Ensure rating and comment are provided
    if (rating === 0 || comment.trim() === "") {
      setMessage("Please provide both a rating and a comment.");
      return;
    }

    const feedbackData = {
      rating,
      comment,
    };

    setIsLoading(true); // Show loading indicator

    try {
      const response = await fetch(
        `http://localhost:9004/api/employee/feedback/${assignmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit feedback.");
      }

      setMessage("Feedback submitted successfully!");
      setTimeout(() => {
        navigate(-1); // Navigate back to the previous page
      }, 1000);
    } catch (error) {
      toast.error(error.message ||  "Failed to submit feedback. Please try again later.")
      setMessage(error.message || "Failed to submit feedback. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-lightBlue to-accentBlue flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border-t-4 border-mediumBlue">
        <h2 className="text-3xl font-bold text-darkBlue mb-8 text-center">
          Submit Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div>
            <label className="text-lg font-semibold text-darkBlue block mb-3">
              Rating (out of 5 stars):
            </label>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    className="cursor-pointer text-4xl"
                    style={{
                      color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                      transition: "color 0.3s ease",
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
              className="text-lg font-semibold text-darkBlue block mb-3"
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
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mediumBlue bg-lightBlue text-darkBlue"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading} // Disable button while loading
              className={`bg-mediumBlue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-darkBlue transform transition-transform hover:scale-105 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && (
          <p
            className={`mt-6 text-center text-lg font-semibold ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
