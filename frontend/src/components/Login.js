
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/users');
            const users = await response.json();

            const user = users.find((user) => user.username === username && user.password === password);

            if (user) {
                setError('');
                navigate('/training-requests');
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            setError('Error logging in. Please try again.');
        }
    };

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
                <button type="submit" className="w-full bg-[#3A6D8C] text-white py-2 rounded hover:bg-[#6A9AB0] transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
