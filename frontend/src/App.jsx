import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TrainingRequestPage from './components/TrainingRequestPage';
import AdminPage from './components/AdminPage';
import EmployeePage from './components/EmployeePage';
import CreateRequestPage from './components/CreateRequestPage';

function App() {
    const [user, setUser] = useState(null);  

    // Handle login and set user state
    const handleLogin = (username,password,role) => {
        setUser({ username, role }); 
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />

               
                <Route
                    path="/training-requests"
                    element={user?.role === 'manager' ? <TrainingRequestPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/employee-dashboard"
                    element={user?.role === 'employee' ? <EmployeePage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin-dashboard"
                    element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" />}
                />
                <Route path="/create-request" element={<CreateRequestPage />} />
            </Routes>
        </Router>
    );
}

export default App;
