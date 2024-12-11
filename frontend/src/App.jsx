import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TrainingRequestPage from './components/TrainingRequestPage';
import AdminPage from './components/AdminPage';
import EmployeePage from './components/EmployeePage';
import CreateRequestPage from './components/CreateRequestPage';
import Requests from './components/Requests';
import CourseCreatePage from './components/CourseCreatePage';
import ActiveCourses from './components/ActiveCourses';
import AssignmentPage from './components/AssignmentPage';
import EmployeeProgress from './components/EmployeeProgress';
import FeedbackPage from './components/FeedbackPage';
import CourseFeedbackPage from './components/CourseFeedbackPage';
import FeedbackViewingPage from './components/FeedbackViewingPage';
import AssignmentRequests from './components/AssignmentRequests';

function App() {
    const [user, setUser] = useState(null);

    // Step 1: Retrieve user from localStorage when app first loads
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []); // Only run this effect once on initial render

    // Step 2: Handle login logic and persist user in localStorage
    const handleLogin = (username, role) => {
        const loggedInUser = { username, role };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store user in localStorage
        toast.success(`Welcome, ${username}!`);
    };

    // Step 3: Handle logout logic and remove user from localStorage
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage on logout
        toast.success('You have successfully logged out.');
    };

    // Redirect logic based on role
    const roleRedirect = (role) => {
        if (role === 'Manager') return '/training-requests/:managerId';
        if (role === 'Employee') return '/employee-dashboard/:employeeId';
        if (role === 'Admin') return '/admin-dashboard/:adminId';
        return '/';
    };

    // Step 4: Ensure routes render correctly once the user state is loaded
//     if (user === null) {
//         return <div>Loading...</div>; // Optional: Show loading while the user state is being initialized
//     }

    return (
        <Router>
            <Toaster position="top-center" />
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/training-requests/:managerId"
                    element={user?.role === 'Manager' ? <TrainingRequestPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/manager/:managerId/all-courses"
                    element={user?.role === 'Manager' ? <ActiveCourses /> : <Navigate to="/" />}
                />
                <Route
                    path="/employee-dashboard/:employeeId"
                    element={user?.role === 'Employee' ? <EmployeePage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin-dashboard/:adminId"
                    element={user?.role === 'Admin' ? <AdminPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/:adminId/requests"
                    element={user?.role === 'Admin' ? <Requests /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/:adminId/assignmentRequests"
                    element={user?.role === 'Admin' ? <AssignmentRequests /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/:adminId/create-course"
                    element={user?.role === 'Admin' ? <CourseCreatePage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/courses-active"
                    element={user?.role === 'Admin' ? <ActiveCourses /> : <Navigate to="/" />}
                />
                <Route path="/create-request/:managerId" element={<CreateRequestPage />} />
                <Route path="/:employeeId/assignment/:assignmentId" element={<AssignmentPage />} />
                <Route path="/progress" element={<EmployeeProgress />} />
                <Route path="/:employeeId/feedback/:assignmentId" element={<FeedbackPage />} />
                <Route path="/course-feedback/:courseId" element={<CourseFeedbackPage />} />
                <Route path="/feedbacks/all" element={<FeedbackViewingPage />} />
                <Route path="*" element={<Navigate to={roleRedirect(user?.role)} />} />
            </Routes>
        </Router>
    );
}

export default App;
