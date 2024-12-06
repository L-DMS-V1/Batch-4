
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();

  const handleNavigateToRequests = () => {
    navigate(`/admin/${adminId}/requests`);
  };

  const handleNavigateToFeedbacks = () => {
    navigate(`/feedbacks/all`);
  };
  const handleNavigateToAssignmentRequests =() =>{
    navigate(`/admin/${adminId}/assignmentRequests`);
  }

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens or session data)
    navigate("/"); // Redirect to login page after logout
  };

  // Use effect to ensure the adminId is correctly retrieved or else redirect
  useEffect(() => {
    if (!adminId) {
      // If the adminId is missing or invalid, navigate to home or login
      navigate("/login");
    }
  }, [adminId, navigate]);

  return (
    <div className="min-h-screen bg-lightBlue flex flex-col">
      {/* Header */}
      <header className="bg-darkBlue text-white py-6 px-8 shadow-lg rounded-b-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <div className="flex items-center space-x-4">
          <p className="text-xl text-white italic">Hi Admin!</p>
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

      <section>
        <br />
        <br />
        <br />
      </section>

      {/* Admin Dashboard Topic */}
      <section className="bg-lightBlue py-6 text-center">
        <h2 className="text-4xl font-extrabold text-darkBlue">Admin Dashboard</h2>
        <p className="text-lg text-gray-600 mt-2">Manage all admin tasks efficiently and stay organized.</p>
      </section>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center py-12 px-4">
        {/* Action Buttons */}
        <section className="flex flex-col md:flex-row md:justify-between w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
          {/* Requests Button */}
          <div className="bg-gradient-to-r from-mediumBlue to-accentBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-white text-xl font-semibold mb-4">
              Manage Course Requests
            </h3>
            <p className="text-lightBlue mb-6 text-center">
              View and process employee course requests efficiently.
            </p>
            <button
              onClick={handleNavigateToRequests}
              className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
            >
              Go to Requests
            </button>
          </div>

          {/* Feedbacks Button */}
          <div className="bg-gradient-to-r from-accentBlue to-mediumBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-white text-xl font-semibold mb-4">
              View Feedback
            </h3>
            <p className="text-lightBlue mb-6 text-center">
              Access employee feedback and improve the learning experience.
            </p>
            <button
              onClick={handleNavigateToFeedbacks}
              className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
            >
              Go to Feedbacks
            </button>
          </div>
          <div className="bg-gradient-to-r from-accentBlue to-mediumBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-white text-xl font-semibold mb-4">
              View Assignment Requests
            </h3>
            <p className="text-lightBlue mb-6 text-center">
              Access employee feedback and improve the learning experience.
            </p>
            <button
              onClick={handleNavigateToAssignmentRequests}
              className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
            >
              Go to Assignment Requests
            </button>
          </div>
        </section>
        
      </main>
    </div>
  );
};

export default AdminPage;
