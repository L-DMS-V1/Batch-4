
// // import React, { useEffect } from "react";
// // import { useNavigate, useParams } from "react-router-dom";

// // const AdminPage = () => {
// //   const navigate = useNavigate();
// //   const { adminId } = useParams();

// //   const handleNavigateToSignUp = ()=>{
// //     navigate(`/signup`);
// //   }

// //   const handleNavigateToRequests = () => {
// //     navigate(`/admin/${adminId}/requests`);
// //   };

// //   const handleNavigateToFeedbacks = () => {
// //     navigate(`/feedbacks/all`);
// //   };
// //   const handleNavigateToAssignmentRequests =() =>{
// //     navigate(`/admin/${adminId}/assignmentRequests`);
// //   }

// //   const handleLogout = () => {
// //     // Perform logout logic here (e.g., clear tokens or session data)
// //     navigate("/"); // Redirect to login page after logout
// //   };

// //   // Use effect to ensure the adminId is correctly retrieved or else redirect
// //   useEffect(() => {
// //     if (!adminId) {
// //       // If the adminId is missing or invalid, navigate to home or login
// //       navigate("/login");
// //     }
// //   }, [adminId, navigate]);

// //   return (
// //     <div className="min-h-screen bg-lightBlue flex flex-col">
// //       {/* Header */}
// //       <header className="bg-darkBlue text-white py-6 px-8 shadow-lg rounded-b-lg flex justify-between items-center">
// //         <h1 className="text-3xl font-bold">Learning Hub</h1>
// //         <div className="flex items-center space-x-4">
// //           <p className="text-xl text-white italic">Hi Admin!</p>
// //           <button
// //             onClick={handleLogout}
// //             className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-red-700 transition duration-300 ease-in-out"
// //           >
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-5 w-5"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M17 16l4-4m0 0l-4-4m4 4H7m10 0V7m0 9H7"
// //               />
// //             </svg>
// //             <span>Logout</span>
// //           </button>
// //         </div>
// //       </header>

// //       <section>
// //         <br />
// //         <br />
// //         <br />
// //       </section>

// //       {/* Admin Dashboard Topic */}
// //       <section className="bg-lightBlue py-6 text-center">
// //         <h2 className="text-4xl font-extrabold text-darkBlue">Admin Dashboard</h2>
// //         <p className="text-lg text-gray-600 mt-2">Manage all admin tasks efficiently and stay organized.</p>
// //       </section>

// //       {/* Main Content */}
// //       <main className="flex-grow flex flex-col items-center py-12 px-4">
// //         {/* Action Buttons */}
// //         <section className="flex flex-col md:flex-row md:justify-between w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
// //           {/* Requests Button */}
// //           <div className="bg-gradient-to-r from-mediumBlue to-accentBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
// //             <h3 className="text-white text-xl font-semibold mb-4">
// //               Manage Course Requests
// //             </h3>
// //             <p className="text-lightBlue mb-6 text-center">
// //               View and process employee course requests efficiently.
// //             </p>
// //             <button
// //               onClick={handleNavigateToRequests}
// //               className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
// //             >
// //               Go to Requests
// //             </button>
// //           </div>

// //           {/* Feedbacks Button */}
// //           <div className="bg-gradient-to-r from-accentBlue to-mediumBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
// //             <h3 className="text-white text-xl font-semibold mb-4">
// //               View Feedback
// //             </h3>
// //             <p className="text-lightBlue mb-6 text-center">
// //               Access employee feedback and improve the learning experience.
// //             </p>
// //             <button
// //               onClick={handleNavigateToFeedbacks}
// //               className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
// //             >
// //               Go to Feedbacks
// //             </button>
// //           </div>
// //           <div className="bg-gradient-to-r from-accentBlue to-mediumBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
// //             <h3 className="text-white text-xl font-semibold mb-4">
// //               View Assignment Requests
// //             </h3>
// //             <p className="text-lightBlue mb-6 text-center">
// //               Access employee feedback and improve the learning experience.
// //             </p>
// //             <button
// //               onClick={handleNavigateToAssignmentRequests}
// //               className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
// //             >
// //               Go to Assignment Requests
// //             </button>
// //           </div>
// //           <div className="bg-gradient-to-r from-accentBlue to-mediumBlue rounded-lg shadow-xl p-8 flex-1 flex flex-col items-center hover:scale-105 transition duration-300 ease-in-out">
// //             <h3 className="text-white text-xl font-semibold mb-4">
// //               Register a User
// //             </h3>
            
// //             <button
// //               onClick={handleNavigateToSignUp}
// //               className="bg-white text-darkBlue py-2 px-6 rounded-full font-medium shadow-lg transform hover:bg-lightBlue hover:text-mediumBlue transition duration-300 ease-in-out"
// //             >
// //               Register User
// //             </button>
// //           </div>
// //         </section>
        
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminPage;


// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { 
//   FolderOpen, 
//   MessageCircle, 
//   UserPlus, 
//   FileText, 
//   LogOut, 
//   ChevronRight,
//   ChevronLeft
// } from "lucide-react";

// const AdminPage = () => {
//   const navigate = useNavigate();
//   const { adminId } = useParams();
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   const navigationItems = [
//     {
//       title: "Course Requests",
//       icon: FolderOpen,
//       description: "Manage course enrollment requests",
//       onClick: () => navigate(`/admin/${adminId}/requests`)
//     },
//     {
//       title: "Feedback",
//       icon: MessageCircle,
//       description: "Analyze user feedback",
//       onClick: () => navigate(`/feedbacks/all`)
//     },
//     {
//       title: "Assignment Requests",
//       icon: FileText,
//       description: "Process assignment submissions",
//       onClick: () => navigate(`/admin/${adminId}/assignmentRequests`)
//     },
//     {
//       title: "Register User",
//       icon: UserPlus,
//       description: "Add new users",
//       onClick: () => navigate(`/signup`)
//     }
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarCollapsed(!isSidebarCollapsed);
//   };

//   return (
//     <div className="flex min-h-screen bg-lightBlue">
//       {/* Interactive Sidebar */}
//       <aside 
//         className={`bg-white border-r shadow-lg transition-all duration-300 
//                     ${isSidebarCollapsed ? 'w-20' : 'w-64'} 
//                     relative overflow-hidden`}
//       >
//         {/* Sidebar Toggle */}
//         <button 
//           onClick={toggleSidebar}
//           className="absolute top-4 right-4 z-10 bg-darkBlue 
//                      text-white p-2 rounded-full"
//         >
//           {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
//         </button>

//         {/* Sidebar Header */}
//         <div className="p-6 border-b">
//           <h1 className={`text-2xl font-bold text-darkBlue transition-opacity 
//                           ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
//             Learning Hub
//           </h1>
//           <p className={`text-sm text-gray-500 transition-opacity 
//                          ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
//             Admin Management
//           </p>
//         </div>

//         {/* Navigation Items */}
//         <nav className="p-4 space-y-2">
//           {navigationItems.map((item) => (
//             <button
//               key={item.title}
//               onClick={item.onClick}
//               className="w-full flex items-center p-3 rounded-lg 
//                          cursor-pointer transition-all duration-300 
//                          hover:bg-lightBlue text-left"
//             >
//               <div className="mr-4">
//                 <item.icon className="w-6 h-6 text-darkBlue" />
//               </div>
//               <div 
//                 className={`flex-grow transition-opacity duration-300 
//                             ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}
//               >
//                 <h3 className="font-semibold text-base">{item.title}</h3>
//                 <p className="text-xs text-gray-500">
//                   {item.description}
//                 </p>
//               </div>
//             </button>
//           ))}
//         </nav>

//         {/* Logout Button */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
//           <button
//             onClick={() => navigate("/")}
//             className="w-full flex items-center justify-center 
//                        bg-red-500 text-white py-2 rounded-lg 
//                        hover:bg-red-600 transition-colors"
//           >
//             <LogOut className="mr-2 w-5 h-5" />
//             <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
//               Logout
//             </span>
//           </button>
//         </div>
//       </aside>

      
//       <main className="flex-grow bg-lightBlue flex items-center justify-center">
//         <div 
//           className="text-center p-8 bg-white rounded-lg shadow-lg 
//                      max-w-xl w-full"
//         >
//           <h2 className="text-3xl font-bold text-darkBlue mb-4">
//             Admin Dashboard
//           </h2>
//           <p className="text-gray-600">
//             Navigate through different sections using the sidebar menu.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminPage;
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FolderOpen, 
  MessageCircle, 
  UserPlus, 
  FileText, 
  LogOut, 
  ChevronRight,
  ChevronLeft,
  BarChart // Add the icon for "Employee Progress"
} from "lucide-react";
import toast from "react-hot-toast";

const AdminPage = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigationItems = [
    {
      title: "Course Requests",
      icon: FolderOpen,
      description: "Manage course enrollment requests",
      onClick: () => navigate(`/admin/${adminId}/requests`)
    },
    {
      title: "Feedback",
      icon: MessageCircle,
      description: "Analyze user feedback",
      onClick: () => navigate(`/feedbacks/all`)
    },
    {
      title: "Assignment Requests",
      icon: FileText,
      description: "Process assignment submissions",
      onClick: () => navigate(`/admin/${adminId}/assignmentRequests`)
    },
    {
      title: "Register User",
      icon: UserPlus,
      description: "Add new users",
      onClick: () => navigate(`/signup`)
    },
    {
      title: "Employee Progress", // New button for Employee Progress
      icon: BarChart, 
      description: "Monitor employee learning progress",
      onClick: () => navigate(`/progress`)
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-lightBlue">
      {/* Interactive Sidebar */}
      <aside 
        className={`bg-white border-r shadow-lg transition-all duration-300 
                    ${isSidebarCollapsed ? 'w-20' : 'w-64'} 
                    relative overflow-hidden`}
      >
        {/* Sidebar Toggle */}
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 right-4 z-10 bg-darkBlue 
                     text-white p-2 rounded-full"
        >
          {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>

        {/* Sidebar Header */}
        <div className="p-6 border-b">
          <h1 className={`text-2xl font-bold text-darkBlue transition-opacity 
                          ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Learning Hub
          </h1>
          <p className={`text-sm text-gray-500 transition-opacity 
                         ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Admin Management
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="w-full flex items-center p-3 rounded-lg 
                         cursor-pointer transition-all duration-300 
                         hover:bg-lightBlue text-left"
            >
              <div className="mr-4">
                <item.icon className="w-6 h-6 text-darkBlue" />
              </div>
              <div 
                className={`flex-grow transition-opacity duration-300 
                            ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}
              >
                <h3 className="font-semibold text-base">{item.title}</h3>
                <p className="text-xs text-gray-500">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={() => {
              toast.success('Logged out successfully');
              navigate("/")}
            }
            className="w-full flex items-center justify-center 
                       bg-red-500 text-white py-2 rounded-lg 
                       hover:bg-red-600 transition-colors"
          >
            <LogOut className="mr-2 w-5 h-5" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      {/* <main className="flex-grow bg-lightBlue flex items-center justify-center">
        <div 
          className="text-center p-8 bg-white rounded-lg shadow-lg 
                     max-w-xl w-full"
        >
          <h2 className="text-3xl font-bold text-darkBlue mb-4">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Navigate through different sections using the sidebar menu.
          </p>
        </div>
      </main> */}
      <main className="flex-grow bg-lightBlue flex items-center justify-center">
  <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-5xl w-full">
    <h2 className="text-3xl font-bold text-darkBlue mb-4">
      Admin Dashboard
    </h2>
    <p className="text-gray-600 mb-6">
      Welcome to the Admin Dashboard. Manage everything efficiently from here.
    </p>

    {/* Image and Content Side-by-Side */}
    <div className="flex items-center justify-between mb-8">
      <div className="w-1/2 pr-6">
        <img 
          src="https://darvideo.tv/wp-content/uploads/2021/05/E-learning-animation-video.jpg" 
          alt="Dashboard Illustration" 
          className="w-full rounded-lg"
        />
      </div>
      <div className="w-1/2 pl-6">
        <p className="text-lg text-gray-700">
          Explore the powerful tools and features designed to streamline your workflow. The dashboard provides access to all critical admin functions.
        </p>
      </div>
    </div>

    {/* Additional Section */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-darkBlue mb-4">
        Quick Overview
      </h3>
      <p className="text-gray-600">
        Easily navigate through the system with the sidebar menu and manage your admin tasks efficiently.
      </p>
    </div>

    
    
  </div>
</main>

    </div>
  );
};

export default AdminPage;
