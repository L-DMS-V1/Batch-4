// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";

// export default function CreateRequestPage() {
//   const { managerId } = useParams();
//   const navigate = useNavigate();
//   const [courseName, setCourseName] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState("");
//   const [requiredEmployees, setRequiredEmployees] = useState([]);
//   // const [managerId, setManagerId] = useState('');
//   const [errors, setErrors] = useState({});
//   const [employees, setEmployees] = useState([]);

//   // Helper function to get the token from cookies
//   const getAuthToken = () => {
//     const match = document.cookie.match(new RegExp("(^| )authToken=([^;]+)"));
//     return match ? match[2] : null;
//   };

//   // Fetch employees from backend on component load
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = getAuthToken();
//         const response = await fetch(
//           `http://localhost:9004/api/manager/${managerId}/employees/allManaged`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         setEmployees(
//           data.map((emp) => ({ value: emp.userId, label: emp.username }))
//         );
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newRequest = {
//       courseName,
//       description,
//       duration,
//       requiredEmployees: requiredEmployees.map((emp) => emp.value),
//       managerId: Number(managerId),
//     };

//     try {
//       const token = getAuthToken();
//       const response = await fetch(
//         "http://localhost:9004/api/manager/request/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Add authorization header
//           },
//           body: JSON.stringify(newRequest),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrors({ message: errorData });
//       } else {
//         navigate(`/training-requests/${managerId}`);
//       }
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       setErrors({ message: "Error submitting request. Please try again." });
//     }
//   };
//   console.log(employees);

//   return (
//     <div className="bg-[#F1F6F9] min-h-screen p-6">
//       <header className="bg-[#1F2A44] text-white p-6 shadow-lg rounded-lg">
//         <h1 className="text-2xl font-semibold">Create Training Request</h1>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl mt-8"
//       >
//         {errors.message && (
//           <p className="text-red-600 mb-6 text-lg font-semibold">
//             {errors.message}
//           </p>
//         )}

//         {/* Course Name */}
//         <div className="mb-6">
//           <label
//             className="block text-gray-800 text-lg font-medium mb-2"
//             htmlFor="courseName"
//           >
//             Course Name
//           </label>
//           <input
//             type="text"
//             id="courseName"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             className={`border p-4 w-full rounded-lg text-lg transition-all focus:ring-2 focus:ring-[#3A6D8C] focus:outline-none ${
//               errors.courseName ? "border-red-500" : "border-gray-300"
//             }`}
//             required
//           />
//           {errors.courseName && (
//             <p className="text-red-500 text-sm">{errors.courseName}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <label
//             className="block text-gray-800 text-lg font-medium mb-2"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`border p-4 w-full rounded-lg text-lg transition-all focus:ring-2 focus:ring-[#3A6D8C] focus:outline-none ${
//               errors.description ? "border-red-500" : "border-gray-300"
//             }`}
//             required
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm">{errors.description}</p>
//           )}
//         </div>

//         {/* Duration */}
//         <div className="mb-6">
//           <label
//             className="block text-gray-800 text-lg font-medium mb-2"
//             htmlFor="duration"
//           >
//             Duration
//           </label>
//           <input
//             type="text"
//             id="duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className={`border p-4 w-full rounded-lg text-lg transition-all focus:ring-2 focus:ring-[#3A6D8C] focus:outline-none ${
//               errors.duration ? "border-red-500" : "border-gray-300"
//             }`}
//             required
//           />
//           {errors.duration && (
//             <p className="text-red-500 text-sm">{errors.duration}</p>
//           )}
//         </div>

//         {/* Required Employees */}
//         <div className="mb-6">
//           <label
//             className="block text-gray-800 text-lg font-medium mb-2"
//             htmlFor="requiredEmployees"
//           >
//             Required Employees
//           </label>
//           <Select
//             id="requiredEmployees"
//             isMulti
//             options={employees}
//             value={requiredEmployees}
//             onChange={setRequiredEmployees}
//             placeholder="Select employees..."
//             className="basic-multi-select text-lg border border-gray-300 rounded-lg p-4 transition-all focus:ring-2 focus:ring-[#3A6D8C]"
//           />
//           {errors.requiredEmployees && (
//             <p className="text-red-500 text-sm">{errors.requiredEmployees}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-[#3A6D8C] text-white px-8 py-3 rounded-lg shadow-lg hover:bg-[#1F2A44] transition-all duration-300 ease-in-out transform hover:scale-105"
//           >
//             Submit Request
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function CreateRequestPage() {
  const { managerId } = useParams();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [requiredEmployees, setRequiredEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);

  const getAuthToken = () => {
    const match = document.cookie.match(new RegExp("(^| )authToken=([^;]+)"));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(
          `http://localhost:9004/api/manager/${managerId}/employees/allManaged`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setEmployees(
          data.map((emp) => ({ value: emp.userId, label: emp.username }))
        );
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [managerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      courseName,
      description,
      duration,
      requiredEmployees: requiredEmployees.map((emp) => emp.value),
      managerId: Number(managerId),
    };

    try {
      const token = getAuthToken();
      const response = await fetch(
        "http://localhost:9004/api/manager/request/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newRequest),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ message: errorData });
      } else {
        navigate(`/training-requests/${managerId}`);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({ message: "Error submitting request. Please try again." });
    }
  };

  return (
    <div className="bg-[#F1F6F9] min-h-screen p-6">
      <header className="bg-[#1F2A44] text-white p-6 shadow-lg rounded-lg relative">
        <h1 className="text-2xl font-semibold">Create Training Request</h1>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-500 transition-all"
        >
          ×
        </button>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl mt-8 relative"
      >
        {errors.message && (
          <p className="text-red-600 mb-6 text-lg font-semibold">
            {errors.message}
          </p>
        )}

        {/* Course Name */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-medium mb-2"
            htmlFor="courseName"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className={`border p-4 w-full rounded-lg text-lg transition-all focus:ring-2 focus:ring-[#3A6D8C] focus:outline-none ${
              errors.courseName ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm">{errors.courseName}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border p-4 w-full rounded-lg text-lg transition-all focus:ring-2 focus:ring-[#3A6D8C] focus:outline-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-medium mb-2"
            htmlFor="duration"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={`border p-4 w-full rounded-lg text-lg transition-all focus:ring-2 focus:ring-[#3A6D8C] focus:outline-none ${
              errors.duration ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration}</p>
          )}
        </div>

        {/* Required Employees */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-medium mb-2"
            htmlFor="requiredEmployees"
          >
            Required Employees
          </label>
          <Select
            id="requiredEmployees"
            isMulti
            options={employees}
            value={requiredEmployees}
            onChange={setRequiredEmployees}
            placeholder="Select employees..."
            className="basic-multi-select text-lg border border-gray-300 rounded-lg p-4 transition-all focus:ring-2 focus:ring-[#3A6D8C]"
          />
          {errors.requiredEmployees && (
            <p className="text-red-500 text-sm">{errors.requiredEmployees}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#3A6D8C] text-white px-8 py-3 rounded-lg shadow-lg hover:bg-[#1F2A44] transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
