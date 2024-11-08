import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const authToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];

        const response = await fetch('http://localhost:9004/api/admin/request/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);
  const goToCourseCreationPage = (request) => {
    navigate(`/admin/create-course`, { state: { requestId: request.requestId, courseName: request.courseName, requiredEmployees: request.requiredEmployees } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request.requestId}
              className="bg-white p-4 shadow rounded-lg flex flex-col space-y-2"
            >
              <h3 className="text-xl font-semibold">{request.courseName}</h3>
              <p>{request.description}</p>
              <p className="text-sm text-gray-500">Duration: {request.duration}</p>
              <p className="text-sm text-gray-500">Manager ID: {request.managerId}</p>
              <button
            onClick={() => goToCourseCreationPage(request)} // Ensure you're not passing the event
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md"
          >
          Create Course
        </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;
