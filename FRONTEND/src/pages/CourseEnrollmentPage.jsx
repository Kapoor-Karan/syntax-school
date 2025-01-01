import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseEnrollmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data.courses); // Use 'courses' key from backend
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch enrolled courses");
        const data = await response.json();
        setEnrolledCourses(data.courses); // Use 'courses' key from backend
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, [navigate]);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to enroll in course");
      const updatedCourse = await response.json();
      setEnrolledCourses([...enrolledCourses, updatedCourse.course]);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-6 bg-indigo-700 text-white">
        <h1 className="text-2xl font-bold">Course Enrollment</h1>
      </header>
      <main className="p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Available Courses
        </h2>
        {loading ? (
          <p className="text-lg text-gray-600">Loading courses...</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="p-6 border rounded-lg shadow-md bg-white"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600">{course.description}</p>
                {enrolledCourses.some((enrolled) => enrolled._id === course._id) ? (
                  <p className="mt-4 text-green-600">Already Enrolled</p>
                ) : (
                  <button
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => handleEnroll(course._id)}
                  >
                    Enroll
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">No courses available.</p>
        )}
      </main>
    </div>
  );
};

export default CourseEnrollmentPage;
