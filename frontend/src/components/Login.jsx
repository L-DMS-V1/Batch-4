import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(location.state?.message || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9004/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, role, username, email } = data;

                
                Cookies.set('authToken', token, { expires: 1 });

                if (role === 'Admin') navigate('/admin/dashboard');
                else if (role === 'Manager') navigate('/manager/dashboard');
                else if (role === 'Employee') navigate('/employee/dashboard');
                
                setError('');
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            setError('Error logging in. Please try again.');
        }
    };

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => setSuccess(''), 5000);
            return () => clearTimeout(timeout);
        }
    }, [success]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#E9EFEC]">
            <h2 className="text-3xl font-bold mb-4 text-[#001F3F]">Login</h2>
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-[#001F3F]" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-[#001F3F]" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                <button type="submit" className="w-full bg-[#3A6D8C] text-white py-2 rounded hover:bg-[#6A9AB0] transition">
                    Login
                </button>
                <p className="text-center text-sm mt-4">
                    Don't have an account? <Link to="/signup" className="text-[#001F3F] font-semibold">Signup</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
