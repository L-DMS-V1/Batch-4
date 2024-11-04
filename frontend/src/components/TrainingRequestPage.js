
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CreateRequestPage from './CreateRequestPage'; // Ensure this is correct

// export default function TrainingRequestPage() {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   // Fetch requests from the JSON server on component mount
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/requests'); // Make sure this endpoint is correct
//         const data = await response.json();
//         setRequests(data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Function to handle "View Details" button
//   const viewDetails = (request) => {
//     setSelectedRequest(request);
//   };

//   // Function to close the details view
//   const closeDetails = () => {
//     setSelectedRequest(null);
//   };

//   return (
//     <div className="bg-[#E9EFEC] min-h-screen p-4">
//       <header className="bg-[#001F3F] text-white p-4 flex justify-between items-center shadow-md">
//         <h1 className="text-xl font-semibold">Learning Hub</h1>
//         <span className="text-lg">Hey Manager!</span>
//       </header>

//       <div className="grid grid-cols-3 gap-4 my-6">
//         {['Total Requests', 'Completed Requests', 'Pending Requests'].map((text, index) => (
//           <div
//             key={index}
//             className="bg-[#6A9AB0] p-4 shadow rounded-lg text-center hover:shadow-xl transition-shadow duration-300 ease-in-out"
//           >
//             <h2 className="text-gray-700 text-sm">{text}</h2>
//             <p className="text-3xl font-semibold text-[#001F3F] mt-2">
//               {index === 0
//                 ? requests.length
//                 : index === 1
//                 ? requests.filter((req) => req.status === 'APPROVED').length
//                 : requests.filter((req) => req.status === 'PENDING').length}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="text-center my-4">
//         <button
//           onClick={() => navigate('/create-request')}
//           className="bg-[#3A6D8C] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#001F3F] transition-all duration-300 ease-in-out"
//         >
//           Create New Request
//         </button>
//       </div>

//       {/* Table with new columns */}
//       <table className="table-auto w-full bg-[#E9EFEC] mt-4 shadow-md">
//         <thead>
//           <tr className="bg-[#3A6D8C] text-white">
//             <th className="px-4 py-2">Training Program</th>
//             <th className="px-4 py-2">Position</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Created Date</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((request, index) => (
//             <tr key={index} className="hover:bg-[#E9EFEC] transition-colors duration-200 ease-in-out">
//               <td className="border px-4 py-2">{request.courseName}</td>
//               <td className="border px-4 py-2">{request.employeePosition}</td>
//               <td className="border px-4 py-2">{request.status}</td>
//               <td className="border px-4 py-2">{request.createdDate}</td>
//               <td className="border px-4 py-2 text-center">
//                 <button
//                   onClick={() => viewDetails(request)}
//                   className="bg-[#001F3F] text-white px-3 py-1 rounded hover:bg-[#3A6D8C] transition duration-200"
//                 >
//                   View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal or Popup for Details */}
//       {selectedRequest && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h2 className="text-lg font-bold mb-4 text-[#001F3F]">Request Details</h2>
//             <p>
//               <strong>Employee ID:</strong> {selectedRequest.employeeId}
//             </p>
//             <p>
//               <strong>Employee Name:</strong> {selectedRequest.employeeName}
//             </p>
//             <p>
//               <strong>Training Program:</strong> {selectedRequest.courseName}
//             </p>
//             <p>
//               <strong>Description:</strong> {selectedRequest.description}
//             </p>
//             <p>
//               <strong>Concepts:</strong> {selectedRequest.concepts}
//             </p>
//             <p>
//               <strong>Duration:</strong> {selectedRequest.duration}
//             </p>
//             <p>
//               <strong>Position:</strong> {selectedRequest.employeePosition}
//             </p>
//             <p>
//               <strong>Status:</strong> {selectedRequest.status}
//             </p>
//             <p>
//               <strong>Created Date:</strong> {selectedRequest.createdDate}
//             </p>
//             <button
//               onClick={closeDetails}
//               className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrainingRequestPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/requests');
        const data = await response.json();
        console.log('Fetched Requests:', data); // Log the fetched data
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const viewDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeDetails = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="bg-[#E9EFEC] min-h-screen p-4">
      <header className="bg-[#001F3F] text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold">Learning Hub</h1>
        <span className="text-lg">Hey Manager!</span>
      </header>

      <div className="grid grid-cols-3 gap-4 my-6">
        {['Total Requests', 'Completed Requests', 'Pending Requests'].map((text, index) => (
          <div
            key={index}
            className="bg-[#6A9AB0] p-4 shadow rounded-lg text-center hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-gray-700 text-sm">{text}</h2>
            <p className="text-3xl font-semibold text-[#001F3F] mt-2">
              {index === 0
                ? requests.length
                : index === 1
                ? requests.filter((req) => req.status === 'APPROVED').length
                : requests.filter((req) => req.status === 'PENDING').length}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center my-4">
        <button
          onClick={() => navigate('/create-request')}
          className="bg-[#3A6D8C] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#001F3F] transition-all duration-300 ease-in-out"
        >
          Create New Request
        </button>
      </div>

      <table className="table-auto w-full bg-[#E9EFEC] mt-4 shadow-md">
        <thead>
          <tr className="bg-[#3A6D8C] text-white">
            <th className="px-4 py-2">Training Program</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index} className="hover:bg-[#E9EFEC] transition-colors duration-200 ease-in-out">
              <td className="border px-4 py-2">{request.courseName}</td>
              <td className="border px-4 py-2">{request.employeePosition}</td>
              <td className="border px-4 py-2">{request.status}</td>
              <td className="border px-4 py-2">{request.createdDate}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => viewDetails(request)}
                  className="bg-[#001F3F] text-white px-3 py-1 rounded hover:bg-[#3A6D8C] transition duration-200"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-[#001F3F]">Request Details</h2>
            <p><strong>Employee ID:</strong> {selectedRequest.employeeId}</p>
            <p><strong>Employee Name:</strong> {selectedRequest.employeeName}</p>
            <p><strong>Training Program:</strong> {selectedRequest.courseName}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Concepts:</strong> {selectedRequest.concepts}</p>
            <p><strong>Duration:</strong> {selectedRequest.duration}</p>
            <p><strong>Position:</strong> {selectedRequest.employeePosition}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <p><strong>Created Date:</strong> {selectedRequest.createdDate}</p>
            <button
              onClick={closeDetails}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
