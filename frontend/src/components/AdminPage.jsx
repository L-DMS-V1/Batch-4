import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const {adminId} = useParams();

  const handleNavigate = () => {
    navigate(`/admin/${adminId}/requests`);
  };
  const handleClick = () => {
    navigate(`/feedbacks/all`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Admin Header */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg mb-6">Welcome to the admin panel. Manage course requests and more.</p>
        <button
          onClick={handleNavigate}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Requests
        </button>
        <br />
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Feedbacks
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
