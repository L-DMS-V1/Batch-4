
// import React, { useState } from 'react';

// const Signup = () => {
//     const [accountId, setAccountId] = useState('');
//     const [accountName, setAccountName] = useState('');
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [role, setRole] = useState('employee');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Basic validation
//         if (password !== confirmPassword) {
//             setError("Passwords don't match.");
//             return;
//         }

//         // You can add additional validation or API call here
//         setError('');
//         console.log('Account created:', { accountId, accountName, username, email, role });
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9EFEC] p-4">
//             <h2 className="text-4xl font-extrabold mb-6 text-[#16423C] text-center">Sign Up</h2>
//             <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="accountId">Account ID</label>
//                     <input
//                         type="text"
//                         id="accountId"
//                         value={accountId}
//                         onChange={(e) => setAccountId(e.target.value)}
//                         className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                         placeholder="Enter your Account ID"
//                         required
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="accountName">Account Name</label>
//                     <input
//                         type="text"
//                         id="accountName"
//                         value={accountName}
//                         onChange={(e) => setAccountName(e.target.value)}
//                         className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                         placeholder="Enter your Account Name"
//                         required
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="username">Username</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                         placeholder="Choose a username"
//                         required
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="password">Password</label>
//                     <div className="relative">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                             placeholder="Create a password"
//                             required
//                         />
//                         <button
//                             type="button"
//                             className="absolute right-3 top-3 text-blue-500 font-semibold"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? 'Hide' : 'Show'}
//                         </button>
//                     </div>
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="confirmPassword">Confirm Password</label>
//                     <input
//                         type={showPassword ? 'text' : 'password'}
//                         id="confirmPassword"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                         placeholder="Confirm your password"
//                         required
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-semibold mb-2 text-[#16423C]" htmlFor="role">Role</label>
//                     <select
//                         id="role"
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9C89] focus:outline-none"
//                     >
//                         <option value="employee">Employee</option>
//                         <option value="manager">Manager</option>
//                         <option value="lcdAdmin">LCD Admin</option>
//                     </select>
//                 </div>
//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//                 <button type="submit" className="w-full bg-[#6A9C89] text-white py-3 rounded-lg hover:bg-[#16423C] transition duration-200">
//                     Create Account
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';

const Signup = () => {
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        // You can add additional validation or API call here
        setError('');
        console.log('Account created:', { accountId, accountName, username, email, role });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9EFEC] p-4">
            <h2 className="text-4xl font-extrabold mb-6 text-[#001F3F] text-center">Sign Up</h2>
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="accountId">Account ID</label>
                    <input
                        type="text"
                        id="accountId"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                        placeholder="Enter your Account ID"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="accountName">Account Name</label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                        placeholder="Enter your Account Name"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                        placeholder="Choose a username"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                            placeholder="Create a password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-blue-500 font-semibold"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-2 text-[#001F3F]" htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full transition focus:border-[#6A9AB0] focus:outline-none"
                    >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="lcdAdmin">LCD Admin</option>
                    </select>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button type="submit" className="w-full bg-[#6A9AB0] text-white py-3 rounded-lg hover:bg-[#3A6D8C] transition duration-200">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Signup;
