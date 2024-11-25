import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const EmployeeProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.employeeName),
    datasets: [
      {
        label: "Progress (%)",
        data: data.map((item) => item.progress),
        backgroundColor: data.map(
          () => `hsl(${Math.random() * 360}, 70%, 50%)`
        ), // Random colors
        borderWidth: 1.5,
        borderRadius: 5,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="h-96 bg-white shadow-md rounded-lg p-6 mb-8">
      <Bar data={chartData} options={options} />
    </div>
  );
};

const EmployeeProgressTable = ({ data }) => (
  <div className="overflow-auto rounded-lg shadow-lg">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <tr>
          <th className="py-3 px-6 text-left">Employee Name</th>
          <th className="py-3 px-6 text-left">Course Name</th>
          <th className="py-3 px-6 text-center">Progress (%)</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm font-light">
        {data.map((item, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="py-3 px-6 text-left">{item.employeeName}</td>
            <td className="py-3 px-6 text-left">{item.courseName}</td>
            <td className="py-3 px-6 text-center">{item.progress}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmployeeProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const res = await fetch(
          "http://localhost:9004/api/admin/progress/complete",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch progress details");
        }
        const data = await res.json();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    if (authToken) fetchProgressData();
  }, [authToken]);

  const filteredData = progressData.filter(
    (item) =>
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const courseProgress = filteredData.reduce((acc, item) => {
    if (!acc[item.courseName]) {
      acc[item.courseName] = { totalProgress: 0, count: 0 };
    }
    acc[item.courseName].totalProgress += item.progress;
    acc[item.courseName].count += 1;
    return acc;
  }, {});

  const courseAverageProgress = Object.keys(courseProgress).map((course) => ({
    course,
    averageProgress: (
      courseProgress[course].totalProgress / courseProgress[course].count
    ).toFixed(2),
  }));

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Employees' Progress
      </h2>

      <div className="mb-6">
        <input
          type="text"
          className="p-2 w-full rounded border border-gray-300"
          placeholder="Search by Employee or Course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="container mx-auto">
        <EmployeeProgressChart data={filteredData} />

        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Course-wise Average Progress
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courseAverageProgress.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-lg font-semibold text-gray-800 mb-4">
                {item.course}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Progress</span>
                <div className="flex items-center">
                  <div className="mr-2 text-xl font-bold text-teal-600">
                    {item.averageProgress}%
                  </div>
                  <div className="w-10 h-2 bg-teal-100 rounded-full">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${item.averageProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Detailed Employee Progress
        </h3>
        <EmployeeProgressTable data={filteredData} />
      </div>
    </div>
  );
};

export default EmployeeProgress;
