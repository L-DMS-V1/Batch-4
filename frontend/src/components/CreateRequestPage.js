
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRequestPage() {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [description, setDescription] = useState('');
  const [concepts, setConcepts] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('PENDING'); // Default status

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newRequest = {
      courseName,
      employeeId,
      employeeName,
      employeePosition,
      description,
      concepts,
      duration,
      status,
      createdDate: new Date().toLocaleDateString(), // Capture the current date
    };

    try {
      await fetch('http://localhost:3001/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });

      // Redirect back to the training requests page after submission
      navigate('/training-requests');
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="bg-[#E9EFEC] min-h-screen p-4">
      <header className="bg-[#001F3F] text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Create Training Request</h1>
      </header>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
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
          <label className="block text-gray-700 mb-2">Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Employee Name</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Position</label>
          <input
            type="text"
            value={employeePosition}
            onChange={(e) => setEmployeePosition(e.target.value)}
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
          <label className="block text-gray-700 mb-2">Concepts</label>
          <input
            type="text"
            value={concepts}
            onChange={(e) => setConcepts(e.target.value)}
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
