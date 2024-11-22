import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function CourseFeedbackPage() {
  const { courseId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});
  
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const authToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('authToken='))
          ?.split('=')[1];

        const response = await fetch(`http://localhost:9004/api/admin/feedbacks/${courseId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);

          // Calculate average rating
          const totalRatings = data.reduce((sum, feedback) => sum + feedback.rating, 0);
          setAverageRating((totalRatings / data.length).toFixed(2));

          // Calculate rating distribution
          const distribution = data.reduce((acc, feedback) => {
            acc[feedback.rating] = (acc[feedback.rating] || 0) + 1;
            return acc;
          }, {});
          setRatingDistribution(distribution);
        } else {
          console.error('Failed to fetch feedbacks');
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [courseId]);

  const pieChartData = {
    labels: Object.keys(ratingDistribution),
    datasets: [
      {
        label: 'Rating Distribution',
        data: Object.values(ratingDistribution),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      },
    ],
  };

  return (
    <div>
      <h2>Course Feedback</h2>
      <h3>Average Rating: {averageRating}</h3>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Pie data={pieChartData} />
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginTop: '20px', padding: '10px' }}>
        <h4>Comments:</h4>
        {feedbacks.map((feedback) => (
          <div key={feedback.feedbackId} style={{ marginBottom: '10px' }}>
            <p><strong>Rating:</strong> {feedback.rating}</p>
            <p><strong>Comment:</strong> {feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
