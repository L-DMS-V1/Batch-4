import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AssignmentPage() {
    const navigate = useNavigate()
    const {employeeId, assignmentId } = useParams();

    const [assignment, setAssignment] = useState(null);
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loadingModules, setLoadingModules] = useState({});
    const [percentage, setPercentage] = useState(0);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        // Extract authToken from cookies
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('authToken='))
            ?.split('=')[1];
        setAuthToken(token);
    }, []);

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
        if (authToken) {
            fetchAssignmentDetail();
        }
    }, [assignmentId, authToken]);

    const handleMarkModuleCompleted = async moduleIndex => {
        setLoadingModules(prev => ({ ...prev, [moduleIndex]: true }));
        try {
            const response = await fetch(
                `http://localhost:9004/api/employee/assignments/${progress.progressId}/complete/${moduleIndex}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to mark module as completed');
            }
            alert(`Module ${moduleIndex + 1} marked as completed!`);
            // Update completedModules locally
            const updatedCompletedModules = progress.completedModules
                .split('')
                .map((bit, index) => (index === moduleIndex ? '1' : bit))
                .join('');
            setProgress(prev => ({ ...prev, completedModules: updatedCompletedModules }));
        } catch (error) {
            console.error('Error marking module as completed:', error);
            alert(`Failed to mark module as completed. ${error.message}`);
        } finally {
            setLoadingModules(prev => ({ ...prev, [moduleIndex]: false }));
        }
    };

    const renderResourceLinks = () => {
        if (!course.resourceLinks || !progress) return null;

        const links = course.resourceLinks.split(',').map(link => link.trim());
        const completedModules = progress.completedModules.split('');

        return links.map((link, index) => {
            const isCompleted = completedModules[index] === '1';
            const isYouTubeLink = link.includes('youtube.com/watch') || link.includes('youtu.be');
            const videoId = isYouTubeLink
                ? link.includes('watch')
                    ? new URLSearchParams(new URL(link).search).get('v')
                    : link.split('/').pop()
                : null;

            return (
                <div key={index} className="mb-6">
                    {isYouTubeLink ? (
                        <iframe
                            className="w-full rounded-lg shadow-lg mb-4"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`YouTube Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline block mb-4"
                        >
                            {link}
                        </a>
                    )}
                    {isCompleted ? (
                        <span className="inline-block px-4 py-2 text-white bg-green-500 rounded-full">
                            Completed
                        </span>
                    ) : (
                        <button
                            onClick={() => handleMarkModuleCompleted(index)}
                            className={`px-6 py-2 rounded-lg text-white text-sm font-bold ${
                                loadingModules[index]
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                            disabled={loadingModules[index]}
                        >
                            {loadingModules[index] ? 'Processing...' : 'Mark as Completed'}
                        </button>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Assignment Details</h1>

                {assignment ? (
                    <div className="p-4 bg-gray-50 rounded-lg shadow-inner mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">Assignment Information</h2>
                        <p className="mt-2"><strong>Deadline:</strong> {assignment.deadline}</p>
                        <p><strong>Status:</strong> {assignment.status}</p>
                    </div>
                ) : (
                    <p>Loading assignment details...</p>
                )}

                {course ? (
                    <div className="p-4 bg-gray-50 rounded-lg shadow-inner mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">Course Information</h2>
                        <p className="mt-2"><strong>Name:</strong> {course.courseName}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Key Concepts:</strong> {course.keyConcepts}</p>
                        <div className="mt-4">
                            <h3 className="font-medium">Resource Links:</h3>
                            {renderResourceLinks()}
                        </div>
                    </div>
                ) : (
                    <p>Loading course details...</p>
                )}

                {progress ? (
                    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700">Progress Information</h2>
                        <p className="mt-2"><strong>Percentage:</strong> {
                            ((progress.completedModules.split('1').length - 1)*100.0/progress.completedModules.split('').length).toFixed(0)
                        }%</p>
                        <p className="mt-2"><strong>Completed Modules:</strong> {progress.completedModules.split('1').length - 1}</p>
                    </div>
                ) : (
                    <p>Loading progress details...</p>
                )}

                {/* {progress && ((progress.completedModules.split('1').length - 1)*100.0/progress.completedModules.split('').length).toFixed(0) == 100 && (<button className="bg-blue-500 p-3">Submit Feedback</button>)} */}
            </div>
        </div>
    );
}
