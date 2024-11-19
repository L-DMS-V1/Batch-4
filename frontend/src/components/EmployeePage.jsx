import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

const EmployeePage = () => {

  const navigate = useNavigate();

  const { employeeId } = useParams(); // Extract employeeId from the route
  const [totalAssigned, setTotalAssigned] = useState([]);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

    useEffect(() => {
      const fetchAssignment = async () => {
        try {
          const response = await fetch(
            `http://localhost:9004/api/employee/${employeeId}/assignments/all`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (!response.ok) {
            throw new Error('Failed to fetch assignments');
          }
          const data = await response.json();
          console.log('Fetched Assignments:', data);
          setTotalAssigned(data); // Update the state without triggering unnecessary re-renders
          let ongoing = 0;
          data.forEach(element => {
            if(element.status == "ONGOING"){
              ongoing++;
            }
          });
          setTotalOngoing(ongoing);
          setTotalCompleted(totalAssigned.length - ongoing)
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      };
    
      if (employeeId) fetchAssignment();
    }, [employeeId, authToken]); // Remove totalAssigned from dependencies
    
  const handleStartCourse = async (assignment) => {
    try {
      const assignmentId = assignment.assignmentId;
      if(assignment.status == "ASSIGNED"){
        const response = await fetch(
          `http://localhost:9004/api/employee/${employeeId}/assignments/${assignmentId}/start`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          alert('Course started successfully!');
          // Update the UI to reflect the course has been started
          // setTotalAssigned(prev =>
          //   prev.map(assignment =>
          //     assignment.assignmentId === assignmentId
          //       ? { ...assignment, status: 'ONGOING' }
          //       : assignment
          //   )
          // );

          navigate(`/assignment/${assignmentId}`)

        } else {
          const errorData = await response.json();
          alert(`Failed to start course: ${errorData.message}`);
        }
      }else if(assignment.status === "ONGOING"){
        navigate(`/assignment/${assignmentId}`)
      }else if(assignment.status === "COMPLETED"){
        navigate(`/feedback/${assignmentId}`)
      }
    } catch (error) {
      console.error('Error starting the course:', error);
      alert('Error starting the course.');
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#E9EFEC] text-gray-900'} min-h-screen`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-[#001F3F]'} flex justify-between items-center px-6 py-4 shadow-md text-white`}>
        <h1 className="text-xl font-bold">Learning Hub</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="bg-gray-700 p-2 rounded">
            {darkMode ? '🌞' : '🌙'}
          </button>
          <h1 className="text-lg italic">Hey Employee</h1>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-3xl font-extrabold text-center mb-6 animate-bounce">Employee Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 bg-[#6A9AB0] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <p className="font-semibold">Total Courses Assigned</p>
            {totalAssigned.length}
          </div>
          <div className="p-6 bg-[#3A6D8C] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <p className="font-semibold">Total Courses Ongoing</p>
            {totalOngoing}
          </div>
          <div className="p-6 bg-[#001F3F] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <p className="font-semibold">Total Courses Completed</p>
            {totalCompleted}
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Assigned Courses</h3>
          {totalAssigned.map((assignment) => (
            <div
              key={assignment.assignmentId}
              className="bg-white p-4 rounded shadow-md border border-gray-300"
            >
              <p>
                <strong>Assignment ID:</strong> {assignment.assignmentId}
              </p>
              <p>
                <strong>Status:</strong> {assignment.status}
              </p>
              <p>
                <strong>Deadline:</strong> {assignment.deadline}
              </p>
              <p>
                <strong>Progress:</strong>{' '}
                {assignment.courseProgress !== null ? `${assignment.courseProgress.percentage}%` : 'Not Started'}
              </p>
              <button
                onClick={() => handleStartCourse(assignment)}
                className={`mt-2 px-4 py-2 rounded text-white ${
                  assignment.status === 'ONGOING'
                    ? 'bg-gray-500'
                    : 'bg-blue-500 hover:bg-blue-700'
                }`}
              >
                { assignment.status === 'ONGOING' ? 'Continue': assignment.status === 'COMPLETED' ? 'Submit Feedback' : 'Start Course' }
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default EmployeePage;
