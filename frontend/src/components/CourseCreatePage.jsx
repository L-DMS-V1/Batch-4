import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CourseCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State to manage form fields
  const [courseName, setCourseName] = useState('');
  const [keyConcepts, setKeyConcepts] = useState('');
  const [duration, setDuration] = useState('');
  const [resourceLinks, setResourceLinks] = useState('');
  const [otherLinks, setOtherLinks] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [errors, setErrors] = useState({});

  // Extract request data passed from the previous page (via `state`)
  const request = location.state;

  useEffect(() => {
    // If request data is available, pre-fill the form
    if (request) {
      setCourseName(request.courseName || '');
      setKeyConcepts(request.keyConcepts || '');
      setDuration(request.duration || '');
      setResourceLinks(request.resourceLinks || '');
      setOutcomes(request.outcomes || '');
    }
  }, [request]);

  const validateForm = () => {
    const newErrors = {};
    if (!courseName) newErrors.courseName = 'Course name is required';
    if (!keyConcepts) newErrors.keyConcepts = 'Key concepts are required';
    if (!duration) newErrors.duration = 'Duration is required';
    if (!resourceLinks) newErrors.resourceLinks = 'Resource links are required';
    if (!outcomes) newErrors.outcomes = 'Outcomes are required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data for submission
    const courseData = {
      courseName,
      keyConcepts,
      duration,
      resourceLinks,
      otherLinks,
      outcomes,
    };

    // Handle course creation logic here (e.g., API call)
    console.log(courseData); // Replace with actual submission logic

    // After submission, navigate to another page (e.g., courses list)
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create a New Course</h2>
        <form onSubmit={handleSubmit}>
          {/* Course Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="courseName">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className={`w-full p-3 mt-2 border ${errors.courseName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
          </div>

          {/* Key Concepts */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="keyConcepts">
              Key Concepts
            </label>
            <input
              type="text"
              id="keyConcepts"
              value={keyConcepts}
              onChange={(e) => setKeyConcepts(e.target.value)}
              required
              className={`w-full p-3 mt-2 border ${errors.keyConcepts ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.keyConcepts && <p className="text-red-500 text-sm">{errors.keyConcepts}</p>}
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="duration">
              Duration (in hours)
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className={`w-full p-3 mt-2 border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>

          {/* Resource Links */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="resourceLinks">
              Resource Links
            </label>
            <input
              type="text"
              id="resourceLinks"
              value={resourceLinks}
              onChange={(e) => setResourceLinks(e.target.value)}
              required
              className={`w-full p-3 mt-2 border ${errors.resourceLinks ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.resourceLinks && <p className="text-red-500 text-sm">{errors.resourceLinks}</p>}
          </div>

          {/* Other Links (Optional) */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="otherLinks">
              Other Links (Optional)
            </label>
            <input
              type="text"
              id="otherLinks"
              value={otherLinks}
              onChange={(e) => setOtherLinks(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Outcomes */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="outcomes">
              Outcomes
            </label>
            <input
              type="text"
              id="outcomes"
              value={outcomes}
              onChange={(e) => setOutcomes(e.target.value)}
              required
              className={`w-full p-3 mt-2 border ${errors.outcomes ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.outcomes && <p className="text-red-500 text-sm">{errors.outcomes}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
