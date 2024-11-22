import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackViewingPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('authToken='))
          ?.split('=')[1];

        const response = await fetch('http://localhost:9004/api/admin/courses/all', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleViewFeedback = (courseId) => {
    navigate(`/course-feedback/${courseId}`);
  };

  return (
    <div>
      <h2>All Courses</h2>
      {courses.map((course) => (
        <div key={course.courseId} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{course.courseName}</h3>
          <button onClick={() => handleViewFeedback(course.courseId)}>View Feedback</button>
        </div>
      ))}
    </div>
  );
}
