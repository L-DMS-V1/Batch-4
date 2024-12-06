import React, { useEffect, useState } from "react";

export default function AssignmentRequests() {
  const [assignmentRequests, setAssignmentRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  // Fetch Assignment Requests from the backend
  useEffect(() => {
    const fetchAssignmentRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:9004/api/admin/assignmentRequests/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch assignment requests");
        }

        const data = await response.json();
        setAssignmentRequests(data);
      } catch (error) {
        console.error("Error fetching assignment requests:", error);
        setMessage("Failed to fetch assignment requests. Please try again.");
      }
    };

    fetchAssignmentRequests();
  }, [authToken]);

  // Handle Checkbox Selection
  const handleCheckboxChange = (requestId) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  // Handle Create Course Assignments
  const handleCreateAssignments = async () => {
    if (selectedRequests.length === 0) {
      setMessage("Please select at least one request.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:9004/api/admin/course-assignments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ requestIds: selectedRequests }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create course assignments");
      }

      const data = await response.json();
      setMessage(
        `Successfully created assignments for requests`
      );

      // Remove successfully processed requests
      setAssignmentRequests((prev) =>
        prev.filter(
          (req) => !selectedRequests.includes(req.requestId)
        )
      );
      setSelectedRequests([]);
    } catch (error) {
      console.error("Error creating course assignments:", error);
      setMessage("Failed to create course assignments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Assignment Requests
      </h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded text-center shadow ${
            message.startsWith("Successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Select</th>
              <th className="px-4 py-2 border border-gray-300">Request Id</th>
              <th className="px-4 py-2 border border-gray-300">Course</th>
              <th className="px-4 py-2 border border-gray-300">Employees</th>
              <th className="px-4 py-2 border border-gray-300">Manager</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignmentRequests.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center px-4 py-4 border border-gray-300"
                >
                  No assignment requests found.
                </td>
              </tr>
            ) : (
              assignmentRequests.map((request) => (
                
                <tr
                  key={request.requestId}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                >
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(
                        request.requestId
                      )}
                      onChange={() =>
                        handleCheckboxChange(request.requestId)
                      }
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                  </td>

                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {request.requestId}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {request.course.courseName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {request.employees.map((emp) => emp.employeeId).join(", ")}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {request.manager.managerId}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {request.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleCreateAssignments}
          disabled={loading || selectedRequests.length === 0}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow ${
            loading || selectedRequests.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Create Course Assignments"}
        </button>
      </div>
    </div>
  );
}
