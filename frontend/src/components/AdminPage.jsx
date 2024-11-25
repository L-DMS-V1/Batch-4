import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();

  const handleNavigate = () => {
    navigate(`/admin/${adminId}/requests`);
  };
  const handleClick = () => {
    navigate(`/feedbacks/all`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8 flex flex-col items-center justify-center">
      {/* Admin Header */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 text-center border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
          Admin Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage course requests, feedback, and more with ease.
        </p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={handleNavigate}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:bg-green-700"
          >
            Go to Requests
          </button>
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:bg-yellow-700"
          >
            Go to Feedbacks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
