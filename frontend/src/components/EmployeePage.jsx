import React, { useState } from 'react';

const EmployeePage = () => {
  const [totalAssigned] = useState(0);
  const [totalOngoing] = useState(0);
  const [totalCompleted] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderProgressCircle = (value, color) => (
    <div className="relative w-24 h-24">
      <div
        className={`absolute inset-0 rounded-full border-4 border-${color}-300 transform rotate-45`}
        style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
      ></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="text-2xl font-bold">{value}%</span>
      </div>
    </div>
  );

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#E9EFEC] text-gray-900'} min-h-screen`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-[#001F3F]'} flex justify-between items-center px-6 py-4 shadow-md text-white`}>
        <h1 className="text-xl font-bold">Learning Hub</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="bg-gray-700 p-2 rounded">
            {darkMode ? '🌞' : '🌙'}
          </button>
          <h1 className="text-lg italic">Hey Employee</h1>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-3xl font-extrabold text-center mb-6 animate-bounce">Employee Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 bg-[#6A9AB0] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <p className="font-semibold">Total Courses Assigned</p>
            {renderProgressCircle(totalAssigned, 'accentBlue')}
          </div>
          <div className="p-6 bg-[#3A6D8C] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <p className="font-semibold">Total Courses Ongoing</p>
            {renderProgressCircle(totalOngoing, 'mediumBlue')}
          </div>
          <div className="p-6 bg-[#001F3F] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <p className="font-semibold">Total Courses Completed</p>
            {renderProgressCircle(totalCompleted, 'darkBlue')}
          </div>
        </div>

        <section className="space-y-4">
          <div className="bg-[#6A9AB0] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 animate-pulse">My Learning</h3>
            <p>Explore your assigned courses and track your progress.</p>
          </div>
          <div className="bg-[#3A6D8C] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 animate-pulse">My Progress</h3>
            <p>View detailed insights into your ongoing learning journey.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmployeePage;

