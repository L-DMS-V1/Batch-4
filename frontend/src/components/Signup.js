import React, { useState } from 'react';

const Signup = () => {
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        setError('');
        setSuccess('');

        // Send user data to db.json
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountId,
                    accountName,
                    username,
                    email,
                    password,
                    role,
                }),
            });

            if (response.ok) {
                setSuccess('Account created successfully!');
                // Reset form fields after successful signup
                setAccountId('');
                setAccountName('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setRole('employee');
            } else {
                setError('Failed to create account.');
            }
        } catch (error) {
            setError('Error creating account. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9EFEC] p-4">
            <h2 className="text-4xl font-extrabold mb-6 text-[#001F3F] text-center">Sign Up</h2>
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="accountId">Account ID</label>
                    <input
                        type="text"
                        id="accountId"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="accountName">Account Name</label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-[#6A9C89] text-white py-3 rounded-lg hover:bg-[#16423C] transition duration-200">
                    Create Account
                </button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
            </form>
        </div>
    );
};

export default Signup;
