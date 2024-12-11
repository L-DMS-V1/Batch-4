import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

 

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top White Rectangle with Login and Signup Buttons */}
      <div className="flex justify-between items-center w-full py-4 px-8 bg-transparent">
        {/* Notebook with Pen Icon */}
        <div className="text-[#001F3F]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H5zM5 5H17V19H5V5Z" />
            <path d="M7 7H15V8H7V7ZM7 10H15V11H7V10ZM7 13H15V14H7V13Z" />
            <path d="M21.707 8.293l-1.414-1.414a1 1 0 00-1.414 0L17.586 9.172a1 1 0 000 1.414l1.414 1.414a1 1 0 001.414 0l1.293-1.293a1 1 0 000-1.414zM16.586 11.172l-1.293 1.293a1 1 0 00-.293.707V15a1 1 0 001 1h2.828a1 1 0 00.707-.293l1.293-1.293a1 1 0 00-1.414-1.414l-1.293 1.293H17v-1.828l1.293-1.293a1 1 0 00-1.414-1.414z" />
          </svg>
        </div>

        {/* Login and Signup Buttons */}
        <div className="space-x-4">
          <button
            className="bg-[#001F3F] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[#3A6D8C] transition duration-300 transform hover:scale-105"
            onClick={handleLoginClick}
          >
            Login
          </button>        
        </div>
      </div>
      {/* Background Image with Dark Overlay and Side-Aligned Text */}
      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center p-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://www.todaytechnology.org/wp-content/uploads/2021/01/How-to-Choose-a-Laptop-for-Studying.jpg')",
        }}
      >
        <div className="text-white md:w-1/2">
          <h1 className="text-5xl font-extrabold text-[#E9EFEC] leading-tight">
            Learning and Development Management
          </h1>
          <p className="mt-4 text-lg font-medium text-[#E9EFEC]">
            Boost employee performance and foster growth through our
            comprehensive training request and management system. Submit, track,
            and manage training requests with ease.
          </p>
        </div>
      </div>
      {/* Topic above the Boxes */}
      <section className="text-center my-8">
        <h2 className="text-3xl font-bold text-[#001F3F]">
          Our Training Management Features
        </h2>
      </section>
      {/* Content Boxes Section with Animations */}
      <section className="flex flex-col items-center p-10 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Box 1 - Submit Training Requests */}
          <div className="bg-[#6A9AB0] rounded-lg shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-[#EAD8B1] rounded-full flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#001F3F]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 1a1 1 0 00-.707 1.707L13.586 6H3a1 1 0 000 2h10.586l-4.293 4.293A1 1 0 0010 15a1 1 0 00.707-1.707L14.586 10H17a1 1 0 100-2h-2.414l-4.293-4.293A1 1 0 0010 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#E9EFEC]">
                Submit Training Requests
              </h2>
            </div>
            <p className="text-[#E9EFEC] text-lg">
              Allow managers to identify skill gaps and submit training requests
              tailored to team development goals.
            </p>
          </div>

          {/* Box 2 - Approve/Reject Requests */}
          <div className="bg-[#6A9AB0] rounded-lg shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-[#EAD8B1] rounded-full flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#001F3F]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 3a1 1 0 011-1h6a1 1 0 011 1v1H6V3zm1 5h6v1H7V8zm0 2h6v1H7v-1zm-1 3h8v1H6v-1zm-2 3h12v1H4v-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#E9EFEC]">
                Approve/Reject Requests
              </h2>
            </div>
            <p className="text-[#E9EFEC] text-lg">
              Admins can review, approve, or reject training requests, ensuring
              alignment with strategic goals.
            </p>
          </div>

          {/* Box 3 - Track Status */}
          <div className="bg-[#6A9AB0] rounded-lg shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-[#EAD8B1] rounded-full flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#001F3F]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 1114 5.197A9.959 9.959 0 0010 18a9.959 9.959 0 00-6-2.803A8 8 0 012 10zm2.293 1.293A1 1 0 005 10h1v4a1 1 0 01-2 0v-3H3.293zM10 10h1v4a1 1 0 11-2 0v-4zm3 5h1v-4h1a1 1 0 110 2h-1v2a1 1 0 11-2 0v-1zm5.707 1.293a1 1 0 01-.293-.707V15h-1a1 1 0 110-2h1v-2a1 1 0 112 0v3a1 1 0 01-.293.707z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#E9EFEC]">
                Track Request Status
              </h2>
            </div>
            <p className="text-[#E9EFEC] text-lg">
              Monitor the status of training requests and keep stakeholders
              informed throughout the process.
            </p>
          </div>
        </div>
      </section>
      {/* New Section for Monitoring Progress */}
      <section className="flex flex-col md:flex-row items-center my-8 mx-10 bg-[#E9EFEC] p-8 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/677/514/original/man-with-laptop-studying-or-working-concept.jpg"
            alt="Employee Progress Monitoring"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h3 className="text-2xl font-bold text-[#001F3F] mb-4">
            Employee Progress Monitoring
          </h3>
          <p className="text-lg text-[#3A6D8C]">
            LCD admins can efficiently monitor employee progress on assigned
            courses, offering insights on completion rates and individual
            development. This feature ensures that employees remain on track
            with their learning goals and allows for timely interventions if
            needed.
          </p>
        </div>
      </section>
      <section className="mt-10 mx-8 p-8 bg-[#E9EFEC] rounded-lg shadow-lg text-[#001F3F]">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-[#3A6D8C] rounded-full mb-4 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center text-[#001F3F]">
            Building Better Programs with Employee Feedback
          </h3>
          <p className="text-lg text-center text-[#3A6D8C] leading-relaxed max-w-lg">
            Employees are invited to share feedback at the end of each course,
            providing valuable insights that enable LCD admins to refine future
            programs. This continuous improvement process ensures training stays
            relevant and impactful.
          </p>
        </div>
      </section>
      {/* Break between sections */}
      <div className="my-10"></div>{" "}
      {/* This creates space between the two sections */}
      <section className="py-12 px-8">
  <h2 className="text-4xl font-extrabold text-[#001F3F] text-center mb-8">Contact Us</h2>

  <div className="text-center mb-10">
    <p className="text-lg text-gray-600 mb-2">
      Have questions or need assistance? We’re here to help!
    </p>
    <p className="text-lg text-gray-600 mb-1 font-medium">
      <span className="text-[#001F3F]">Email:</span> l&d@gmail.com
    </p>
    <p className="text-lg text-gray-600 font-medium">
      <span className="text-[#001F3F]">Phone:</span> (649) 283-9802
    </p>
  </div>

  <h3 className="text-3xl font-bold text-[#001F3F] text-center mb-6">Follow Us</h3>
  <div className="flex justify-center space-x-8">
    {/* Instagram Icon */}
    <a
      href="#"
      aria-label="Instagram"
      className="text-[#001F3F] hover:text-[#3A6D8C] transition duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 hover:scale-110 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.046.247 2.515.414a4.92 4.92 0 011.768 1.143 4.92 4.92 0 011.143 1.768c.167.469.358 1.309.414 2.515.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.247 2.046-.414 2.515a4.92 4.92 0 01-1.143 1.768 4.92 4.92 0 01-1.768 1.143c-.469.167-1.309.358-2.515.414-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.046-.247-2.515-.414a4.92 4.92 0 01-1.768-1.143 4.92 4.92 0 01-1.143-1.768c-.167-.469-.358-1.309-.414-2.515C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.206.247-2.046.414-2.515a4.92 4.92 0 011.143-1.768A4.92 4.92 0 015.488 2.58c.469-.167 1.309-.358 2.515-.414C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.197 0-3.567.012-4.818.07-1.026.05-1.679.225-2.078.38a3.194 3.194 0 00-1.165.759c-.331.331-.582.735-.759 1.165-.155.399-.33 1.052-.38 2.078-.058 1.25-.07 1.621-.07 4.818s.012 3.567.07 4.818c.05 1.026.225 1.679.38 2.078.177.43.428.834.759 1.165.331.331.735.582 1.165.759.399.155 1.052.33 2.078.38 1.25.058 1.621.07 4.818.07s3.567-.012 4.818-.07c1.026-.05 1.679-.225 2.078-.38a3.194 3.194 0 001.165-.759c.331-.331.582-.735.759-1.165.155-.399.33-1.052.38-2.078.058-1.25.07-1.621.07-4.818s-.012-3.567-.07-4.818c-.05-1.026-.225-1.679-.38-2.078a3.194 3.194 0 00-.759-1.165 3.194 3.194 0 00-1.165-.759c-.399-.155-1.052-.33-2.078-.38-1.25-.058-1.621-.07-4.818-.07zM12 7.398a4.602 4.602 0 110 9.204 4.602 4.602 0 010-9.204zm0 1.837a2.765 2.765 0 100 5.531 2.765 2.765 0 000-5.531zm5.354-2.151a1.078 1.078 0 110 2.156 1.078 1.078 0 010-2.156z" />
      </svg>
    </a>

    {/* Facebook Icon */}
    <a
      href="#"
      aria-label="Facebook"
      className="text-[#001F3F] hover:text-[#3A6D8C] transition duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 hover:scale-110 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987H7.898v-2.892h2.54V9.413c0-2.507 1.492-3.89 3.777-3.89 1.096 0 2.238.196 2.238.196v2.463h-1.26c-1.242 0-1.627.772-1.627 1.562v1.875h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
      </svg>
    </a>

    {/* LinkedIn Icon */}
    <a
      href="#"
      aria-label="LinkedIn"
      className="text-[#001F3F] hover:text-[#3A6D8C] transition duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 hover:scale-110 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.452 20.452h-3.54v-5.95c0-1.419-.03-3.246-1.974-3.246-1.974 0-2.278 1.541-2.278 3.132v6.064h-3.539V10.01h3.397v1.48h.047c.474-.895 1.633-1.84 3.354-1.84 3.593 0 4.253 2.359 4.253 5.413v5.391h-.001zm-16.122-12.87c-1.139 0-2.055.918-2.055 2.04 0 1.119.93 2.038 2.042 2.038h.027c1.139 0 2.06-.919 2.06-2.038-.003-1.122-.919-2.04-2.059-2.04h-.027zm1.749 12.87H3.282V10.01h3.699v10.472zM22.224 0H1.771C.792 0 0 .784 0 1.754v20.491C0 23.216.792 24 1.771 24h20.451c.982 0 1.774-.784 1.774-1.754V1.754C24 .784 23.206 0 22.224 0z" />
      </svg>
    </a>
  </div>
</section>

    </div>
  );
};

export default Home;
