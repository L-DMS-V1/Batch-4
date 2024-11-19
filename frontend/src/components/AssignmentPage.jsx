import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AssignmentPage() {
    const { assignmentId } = useParams();

    const [assignment, setAssignment] = useState(null);
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(false);

    const authToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

    useEffect(() => {
        const fetchAssignmentDetail = async () => {
            try {
                const response = await fetch(`http://localhost:9004/api/employee/assignment/${assignmentId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch assignment details');
                }
                const data = await response.json();
                console.log('Fetched Data:', data);
                setAssignment(data.assignment);
                setCourse(data.course);
                setProgress(data.progress);
            } catch (error) {
                console.error('Error fetching assignment details:', error);
            }
        };
        fetchAssignmentDetail();
    }, [assignmentId, authToken]);

    const handleMarkAsCompleted = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:9004/api/employee/assignments/${progress.progressId}/complete`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to mark as completed');
            }
            alert('Course marked as completed!');
            setProgress(prev => ({ ...prev, percentage: 100 }));
            setAssignment(prev => ({ ...prev, status: 'COMPLETED' }));
        } catch (error) {
            console.error('Error marking assignment as completed:', error);
            alert('Failed to mark as completed. ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderResourceLinks = () => {
        if (!course.resourceLinks) return null;

        const links = course.resourceLinks.split(',').map(link => link.trim());

        return links.map((link, index) => {
            const isYouTubeLink = link.includes('youtube.com/watch') || link.includes('youtu.be');

            if (isYouTubeLink) {
                // Extract YouTube video ID
                const videoId = link.includes('watch')
                    ? new URLSearchParams(new URL(link).search).get('v')
                    : link.split('/').pop();

                return (
                    <div key={index} className="mb-4">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`YouTube Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            } else {
                return (
                    <div key={index} className="mb-4">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {link}
                        </a>
                    </div>
                );
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Assignment Details</h1>

            {assignment ? (
                <div className="bg-white p-4 shadow rounded-lg mb-4">
                    <p><strong>Deadline:</strong> {assignment.deadline}</p>
                    <p><strong>Status:</strong> {assignment.status}</p>
                </div>
            ) : (
                <p>Loading assignment details...</p>
            )}

            {course ? (
                <div className="bg-white p-4 shadow rounded-lg mb-4">
                    <h2 className="text-xl font-semibold">Course Information</h2>
                    <p><strong>Name:</strong> {course.courseName}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Key Concepts:</strong> {course.keyConcepts}</p>
                    <div>
                        <strong>Resource Links:</strong>
                        {renderResourceLinks()}
                    </div>
                </div>
            ) : (
                <p>Loading course details...</p>
            )}

            {progress ? (
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold">Progress Information</h2>
                    <p><strong>Percentage:</strong> {progress.percentage}%</p>
                    <button
                        onClick={handleMarkAsCompleted}
                        className={`mt-4 px-4 py-2 rounded text-white ${
                            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
                        }`}
                        disabled={loading || progress.percentage === 100}
                    >
                        {loading ? 'Processing...' : 'Mark as Completed'}
                    </button>
                </div>
            ) : (
                <p>Loading progress details...</p>
            )}
        </div>
    );
}
