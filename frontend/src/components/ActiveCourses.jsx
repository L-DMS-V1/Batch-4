import React, { useState } from "react";

export default function ActiveCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:9004/api/manager/course/all"
        );
        const data = await response.json();
        console.log("Fetched Requests:", data); // Log the fetched data
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);
  return (
    <>
      <div>ActiveCourses</div>
    </>
  );
}
