import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FeedbackPage() {
    const navigate = useNavigate();
  const {employeeId, assignmentId} = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];
  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      rating,
      comment,
    };

    try {
        const response = await fetch(`http://localhost:9004/api/employee/feedback/${assignmentId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Add authorization header
            },
            body: JSON.stringify(feedbackData),
          });
        //   const data = await response.json();
          console.log(response)
          if(! response.ok){
            console.log("byeee")
            throw error(data)
          }

      setMessage('Feedback submitted successfully!');
    //   setTimeout(()=>{}, 1000)
      navigate(`/${employeeId}/assignment/${assignmentId}`)
      console.log("what")
      
    } catch (error) {
      setMessage('Failed to submit feedback. Please try again later.');
    //   console.error(error);
    }
  };

  return (
    <div className="feedback-page">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating">
          <label>Rating (out of 5 stars):</label>
          <div>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={starValue}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    cursor: 'pointer',
                    color: starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                    fontSize: '2rem',
                  }}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
