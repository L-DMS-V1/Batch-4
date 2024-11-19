import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export default function CourseCreatePage() {
  const {adminId} = useParams();
  const getAuthToken = () => {
    const match = document.cookie.match(new RegExp('(^| )authToken=([^;]+)'));
    return match ? match[2] : null;
  };

  const navigate = useNavigate();
  const location = useLocation();

  // State to manage form fields
  const [requestId, setRequestId] = useState(0);
  const [courseName, setCourseName] = useState('');
  const [keyConcepts, setKeyConcepts] = useState('');
  const [duration, setDuration] = useState('');
  const [resourceLinks, setResourceLinks] = useState('');
  const [otherLinks, setOtherLinks] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [requiredEmployees, setRequiredEmployees] = useState([])
  const [deadline, setDeadline] = useState('');

  // Extract request data passed from the previous page (via `state`)
  const request = location.state;
  // requiredEmployees = request?.requiredEmployees || [];

  useEffect(() => {
    // If request data is available, pre-fill the form
    if (request) {
      setRequestId(request.requestId || 0)
      setCourseName(request.courseName || '');
      setKeyConcepts(request.keyConcepts || '');
      setDuration(request.duration || '');
      setResourceLinks(request.resourceLinks || '');
      setOutcomes(request.outcomes || '');
      setRequiredEmployees(request.requiredEmployees || [])
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

  const handleSubmit = async (e) => {
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
      outcomes
      // assignedEmployees: selectedEmployees.map(emp => emp.value), // only include IDs
    };
    let course;
    let token;
    try {
      token = getAuthToken();
      const response = await fetch(`http://localhost:9004/api/admin/${adminId}/course/create/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ message: errorData });
      } else {
        const data = await response.json();
        course = data.course
        const displayMessage = data.message
        console.log(response)
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors({ message: 'Error submitting request. Please try again.' });
    }

    try {
      const response = await fetch('http://localhost:9004/api/admin/course/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify({
          courseId: course.courseId,
          status: "ASSIGNED",
          deadline: deadline,
          employeeIds: selectedEmployees.map(selected => selected.value)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ message: errorData });
      } else {
        const data = await response.json();
        alert('course created and assigned')
        navigate(`/admin-dashboard/${adminId}`)
      }
    } catch (error) {
      console.error('Error assigning course:', error);
      setErrors({ message: 'Error assigning course. Please try again.' });
    }

  };

  // Toggle "Select All" functionality
  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedEmployees([]);
  //   } else {
  //     setSelectedEmployees(requiredEmployees.map(emp => ({ value: emp.userId, label: emp.username })));
  //   }
  //   setSelectAll(!selectAll);
  // };

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

          {/* Assign Employees */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="assignedEmployees">
              Assign Employees
            </label>
            <Select
              isMulti
              options={requiredEmployees.map(empId => ({
                value: empId,                   // Use empId directly as the unique value
                label: `Employee ID: ${empId}`   // Create a unique label for each employee
              }))}
              value={selectedEmployees}
              onChange={(selected) => {setSelectedEmployees(selected)}}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            {/* <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-600">Select All</span>
              </label>
            </div> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="otherLinks">
              Deadline
            </label>
            <input
              type="date"
              id="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              as='div'
            />
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
