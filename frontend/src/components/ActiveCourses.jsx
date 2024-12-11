// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function ActiveCourses() {
//   const [courses, setCourses] = useState([]);
//   const [availableEmployees, setAvailableEmployees] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const {managerId} = useParams();
//   const navigate = useNavigate();

//   const authToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("authToken="))
//     ?.split("=")[1];

//   // Fetch all courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:9004/api/manager/course/all",
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await response.json();
//         setCourses(data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, [authToken]);

//   // Fetch available employees for the selected course
//   const fetchAvailableEmployees = async (courseId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:9004/api/manager/course/${courseId}/available-employees`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       setAvailableEmployees(data);
//     } catch (error) {
//       console.error("Error fetching available employees:", error);
//     }
//   };

//   // Assign selected employees to the course
//   const handleAssignEmployees = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:9004/api/manager/course/${selectedCourse}/assign`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ employeeIds: selectedEmployees, managerId: managerId }),
//         }
//       );

//       if (response.ok) {
//         alert("Employees assignement Request Created successfully!");
//         setSelectedEmployees([]);
//         setAvailableEmployees([]);
//         setSelectedCourse(null); // Reset the selected course after assignment
//         navigate(`/training-requests/${managerId}`)
//       } else {
//         console.error("Error assigning employees:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error assigning employees:", error);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Active Courses</h1>
//       <div className="space-y-6">
//         {courses.map((course) => (
//           <div
//             key={course.courseId}
//             className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
//           >
//             <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
//             <p className="text-gray-600 mb-2">{course.keyConcepts}</p>
//             <p className="text-gray-600 mb-4">Duration: {course.duration}</p>
//             <button
//               onClick={() => {
//                 setSelectedCourse(course.courseId);
//                 fetchAvailableEmployees(course.courseId);
//               }}
//               className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//             >
//               Add Employees
//             </button>

//             {/* Render the employee selection dropdown below the selected course */}
//             {selectedCourse === course.courseId && (
//               <div className="mt-4">
//                 <h4 className="text-lg font-medium mb-2">
//                   Add Employees to {course.courseName}
//                 </h4>
//                 <select
//                   multiple
//                   value={selectedEmployees}
//                   onChange={(e) =>
//                     setSelectedEmployees(
//                       Array.from(e.target.selectedOptions, (option) => option.value)
//                     )
//                   }
//                   className="w-full border-gray-300 rounded-md shadow-sm mb-4"
//                 >
//                   {availableEmployees.map((emp) => (
//                     <option key={emp.employeeId} value={emp.employeeId}>
//                       {`EmployeeId: ${emp.employeeId}`}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={handleAssignEmployees}
//                   className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                 >
//                   Assign Employees
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ActiveCourses() {
  const [courses, setCourses] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { managerId } = useParams();
  const navigate = useNavigate();

  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:9004/api/manager/course/all", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [authToken]);

  const fetchAvailableEmployees = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:9004/api/manager/${managerId}/course/${courseId}/available-employees`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAvailableEmployees(data);
    } catch (error) {
      console.error("Error fetching available employees:", error);
    }
  };

  const handleAssignEmployees = async () => {
    try {
      const response = await fetch(
        `http://localhost:9004/api/manager/course/${selectedCourse}/assign`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employeeIds: selectedEmployees, managerId }),
        }
      );

      if (response.ok) {
        alert("Employees assignment request created successfully!");
        setSelectedEmployees([]);
        setAvailableEmployees([]);
        setSelectedCourse(null);
        navigate(`/training-requests/${managerId}`);
      } else {
        console.error("Error assigning employees:", await response.text());
      }
    } catch (error) {
      console.error("Error assigning employees:", error);
    }
  };

  return (
    <div className="bg-[#E9EFEC] min-h-screen p-8 font-sans relative">
      {/* Back Button */}
      <button
  className="absolute top-4 left-4 text-[#3A6D8C] font-semibold text-lg hover:text-[#001F3F] transition-all"
  onClick={() => navigate(-1)}
>
  ← Back
</button>

      <h1 className="text-2xl font-bold text-[#001F3F] text-center mb-6">Active Courses</h1>

      {/* Course List */}
      <div>
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="bg-white border border-[#6A9AB0] rounded-lg shadow-lg mb-6 p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-[#001F3F] mb-2">{course.courseName}</h3>
            <p className="text-[#3A6D8C] mb-2">{course.keyConcepts}</p>
            <p className="text-[#3A6D8C] mb-4">Duration: {course.duration}</p>

            {/* Add Employees Button */}
            <button
              onClick={() => {
                setSelectedCourse(course.courseId);
                fetchAvailableEmployees(course.courseId);
              }}
              className="bg-[#6A9AB0] text-white py-2 px-4 rounded hover:bg-[#5B8BA0] transition"
            >
              Add Employees
            </button>

            {/* Employee Selection for Current Course */}
            {selectedCourse === course.courseId && (
              <div className="mt-4">
                <h4 className="text-[#001F3F] font-medium mb-2">
                  Add Employees to {course.courseName}
                </h4>
                <select
                  multiple
                  value={selectedEmployees}
                  onChange={(e) =>
                    setSelectedEmployees(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="w-full border border-[#6A9AB0] bg-gray-50 text-[#001F3F] rounded mb-4 p-2"
                >
                  {availableEmployees.map((emp) => (
                    <option key={emp.employeeId} value={emp.employeeId}>
                      EmployeeId: {emp.employeeId}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssignEmployees}
                  className="bg-[#3A6D8C] text-white py-2 px-4 rounded hover:bg-[#2A5D78] transition"
                >
                  Assign Employees
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
