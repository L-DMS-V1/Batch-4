import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

export default function CreateRequestPage() {
  const {managerId} = useParams();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [requiredEmployees, setRequiredEmployees] = useState([]);
  // const [managerId, setManagerId] = useState('');
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);

  // Helper function to get the token from cookies
  const getAuthToken = () => {
    const match = document.cookie.match(new RegExp('(^| )authToken=([^;]+)'));
    return match ? match[2] : null;
  };

  // Fetch employees from backend on component load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch('http://localhost:9004/api/manager/employees/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEmployees(data.map(emp => ({ value: emp.userId, label: emp.username })));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newRequest = {
      courseName,
      description,
      duration,
      requiredEmployees: requiredEmployees.map(emp => emp.value),
      managerId: Number(managerId),
    };

    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:9004/api/manager/request/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ message: errorData });
      } else {
        navigate(`/training-requests/${managerId}`);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrors({ message: 'Error submitting request. Please try again.' });
    }
  };
  console.log(employees)

  return (
    <div className="bg-[#E9EFEC] min-h-screen p-4">
      <header className="bg-[#001F3F] text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Create Training Request</h1>
      </header>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        {errors.message && (
          <p className="text-red-500 mb-4">{errors.message}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Required Employees</label>
          <Select
            isMulti
            options={employees}
            value={requiredEmployees}
            onChange={setRequiredEmployees}
            placeholder="Select employees..."
            className="basic-multi-select border border-gray-300 rounded"
            classNamePrefix="select"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-2">Manager ID</label>
          <input
            type="number"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div> */}
        <button
          type="submit"
          className="bg-[#3A6D8C] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#001F3F] transition-all duration-300 ease-in-out"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
