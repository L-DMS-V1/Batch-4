import React from 'react';
import { Link } from 'react-router-dom';

const Home= () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top White Rectangle with Login Button */}
            

<div className="flex justify-between items-center w-full py-4 px-8 bg-transparent">
    {/* Notebook with Pen Icon */}
    <div className="text-[#16423C]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
           
            <path d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H5zM5 5H17V19H5V5Z" />
           
            <path d="M7 7H15V8H7V7ZM7 10H15V11H7V10ZM7 13H15V14H7V13Z" />
            
            <path d="M21.707 8.293l-1.414-1.414a1 1 0 00-1.414 0L17.586 9.172a1 1 0 000 1.414l1.414 1.414a1 1 0 001.414 0l1.293-1.293a1 1 0 000-1.414zM16.586 11.172l-1.293 1.293a1 1 0 00-.293.707V15a1 1 0 001 1h2.828a1 1 0 00.707-.293l1.293-1.293a1 1 0 00-1.414-1.414l-1.293 1.293H17v-1.828l1.293-1.293a1 1 0 00-1.414-1.414z" />
        </svg>
    </div>

    {/* Login Button */}

        <Link className="bg-[#16423C] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[#6A9C89] transition duration-300 transform hover:scale-105" to="/login" role="button">Login</Link>
    
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
                    <h1 className="text-5xl font-extrabold text-[#E9EFEC] leading-tight">Learning and Development Management</h1>
                    <p className="mt-4 text-lg font-medium text-[#E9EFEC]">
                        Boost employee performance and foster growth through our comprehensive training request and management system. Submit, track, and manage training requests with ease.
                    </p>
                </div>
            </div>

            {/* Topic above the Boxes */}
            <section className="text-center my-8">
                <h2 className="text-3xl font-bold text-[#16423C]">Our Training Management Features</h2>
            </section>

            {/* Content Boxes Section with Animations */}
            <section className="flex flex-col items-center p-10 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Box 1 - Submit Training Requests */}
                    <div className="bg-[#6A9C89] rounded-lg shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-[#EAD8B1] rounded-full flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#16423C]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 1a1 1 0 00-.707 1.707L13.586 6H3a1 1 0 000 2h10.586l-4.293 4.293A1 1 0 0010 15a1 1 0 00.707-1.707L14.586 10H17a1 1 0 100-2h-2.414l-4.293-4.293A1 1 0 0010 1z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#E9EFEC]">Submit Training Requests</h2>
                        </div>
                        <p className="text-[#E9EFEC] text-lg">
                            Allow managers to identify skill gaps and submit training requests tailored to team development goals.
                        </p>
                    </div>

                    {/* Box 2 - Approve/Reject Requests */}
                    <div className="bg-[#6A9C89] rounded-lg shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-[#EAD8B1] rounded-full flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#16423C]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 3a1 1 0 011-1h6a1 1 0 011 1v1H6V3zm1 5h6v1H7V8zm0 2h6v1H7v-1zm-1 3h8v1H6v-1zm-2 3h12v1H4v-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#E9EFEC]">Approve/Reject Requests</h2>
                        </div>
                        <p className="text-[#E9EFEC] text-lg">
                            Admins can review, approve, or reject training requests, ensuring alignment with strategic goals.
                        </p>
                    </div>

                    {/* Box 3 - Track Status */}
                    <div className="bg-[#6A9C89] rounded-lg shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-[#EAD8B1] rounded-full flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#16423C]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10a8 8 0 1114 5.197A9.959 9.959 0 0010 18a9.959 9.959 0 00-6-2.803A8 8 0 012 10zm2.293 1.293A1 1 0 005 10h1v4a1 1 0 01-2 0v-1.707l-.293-.293zm2.293-1.293A1 1 0 007 10H8V9a1 1 0 00-2 0v1.293z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#E9EFEC]">Track Requests</h2>
                        </div>
                        <p className="text-[#E9EFEC] text-lg">
                            Track the status of each request, providing real-time insights into training progress.
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
                    <h3 className="text-2xl font-bold text-[#16423C] mb-4">Employee Progress Monitoring</h3>
                    <p className="text-lg text-[#16423C]">
                        LCD admins can efficiently monitor employee progress on assigned courses, offering insights on completion rates and individual development. This feature ensures that employees remain on track with their learning goals and allows for timely interventions if needed.
                    </p>
                </div>
            </section>
            

<section className="mt-10 mx-8 p-8 bg-[#E9EFEC] rounded-lg shadow-lg text-[#16423C]">
    <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-[#6A9C89] rounded-full mb-4 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-center">Building Better Programs with Employee Feedback</h3>
        <p className="text-lg text-center text-[#3B413C] leading-relaxed max-w-lg">
            Employees are invited to share feedback at the end of each course, providing valuable insights that enable LCD admins to refine future programs. This continuous improvement process ensures training stays relevant and impactful.
        </p>
    </div>
</section>


    
<section className="py-10 px-8 bg-white">
    <h2 className="text-3xl font-bold text-[#16423C] text-center mb-6">Contact Us</h2>

    <div className="text-center mb-8">
        <p className="text-lg text-gray-700 mb-2">
            Have questions or need assistance? Reach out to us!
        </p>
        <p className="text-lg text-gray-700 mb-2">Email: support@example.com</p>
        <p className="text-lg text-gray-700 mb-2">Phone: (123) 456-7890</p>
    </div>
    
    <h3 className="text-2xl font-bold text-[#16423C] text-center mb-4">Follow Us</h3>
    <div className="flex justify-center space-x-6">
        {/* Instagram Icon */}
        <a href="#" aria-label="Instagram" className="text-[#16423C] hover:text-[#6A9C89] transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.5C6.4 2.5 2 6.9 2 12.5c0 5.6 4.4 10 10 10s10-4.4 10-10c0-5.6-4.4-10-10-10zm4.1 16.4h-8.2c-.7 0-1.3-.6-1.3-1.3v-8.2c0-.7.6-1.3 1.3-1.3h8.2c.7 0 1.3.6 1.3 1.3v8.2c0 .7-.6 1.3-1.3 1.3zm-4.1-9.2a2.7 2.7 0 100 5.5 2.7 2.7 0 000-5.5zm0 4.1a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm5.8-5.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1.4z" />
            </svg>
        </a>

        {/* Facebook Icon */}
        <a href="#" aria-label="Facebook" className="text-[#16423C] hover:text-[#6A9C89] transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10S17.5 2 12 2zm3 11h-2v6h-4v-6H9V10h4V8c0-1.5.8-3 3-3h2v4h-2c-.5 0-1 .5-1 1v2h3l-1 3z" />
            </svg>
        </a>

        {/* LinkedIn Icon */}
        <a href="#" aria-label="LinkedIn" className="text-[#16423C] hover:text-[#6A9C89] transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.452 20.452h-3.54v-5.95c0-1.419-.03-3.246-1.974-3.246-1.974 0-2.278 1.541-2.278 3.132v6.064h-3.539V10.01h3.397v1.48h.047c.474-.895 1.633-1.84 3.354-1.84 3.593 0 4.253 2.359 4.253 5.413v5.391h-.001zm-16.122-12.87c-1.139 0-2.055.918-2.055 2.04 0 1.119.93 2.038 2.042 2.038h.027c1.139 0 2.06-.919 2.06-2.038-.003-1.122-.919-2.04-2.059-2.04h-.027zm1.749 12.87H3.282V10.01h3.699v10.472zM22 0H2C.897 0 0 .897 0 2v20c0 1.103.897 2 2 2h20c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z" />
            </svg>
        </a>
    </div>


</section>

        </div>
    );
};

export default Home;