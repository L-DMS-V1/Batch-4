import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TrainingRequestPage from './components/TrainingRequestPage';
import AdminPage from './components/AdminPage';
import EmployeePage from './components/EmployeePage';
import CreateRequestPage from './components/CreateRequestPage';
import Requests from './components/Requests';
import CourseCreatePage from './components/CourseCreatePage';

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (username, role) => {
        setUser({ username, role });
    };

    const roleRedirect = (role) => {
        if (role === 'Manager') return '/training-requests';
        if (role === 'Employee') return '/employee-dashboard';
        if (role === 'Admin') return '/admin-dashboard';
        return '/';
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/training-requests"
                    element={user?.role === 'Manager' ? <TrainingRequestPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/employee-dashboard"
                    element={user?.role === 'Employee' ? <EmployeePage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin-dashboard"
                    element={user?.role === 'Admin' ? <AdminPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/requests"
                    element={user?.role === 'Admin' ? <Requests /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/create-course"
                    element={user?.role === 'Admin' ? <CourseCreatePage /> : <Navigate to="/" />}
                />
                <Route path="/create-request" element={<CreateRequestPage />} />
                <Route path="*" element={<Navigate to={roleRedirect(user?.role)} />} />
            </Routes>
        </Router>
    );
}

export default App;
