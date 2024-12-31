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
        const response = await fetch("http://localhost:3000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
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

        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }

        const data = await response.json();
        setEnrolledCourses(data);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in course");
      }

      const updatedCourse = await response.json();
      setEnrolledCourses([...enrolledCourses, updatedCourse.course]);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold">Course Enrollment</h1>
      </header>
      <main className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800">Available Courses</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length > 0 ? (
          <ul className="mt-4">
            {courses.map((course) => (
              <li
                key={course._id}
                className="p-4 border rounded-md shadow-md mb-4 bg-white"
              >
                <h4 className="text-xl font-semibold">{course.title}</h4>
                <p className="text-gray-600">{course.description}</p>
                {enrolledCourses.some((enrolled) => enrolled._id === course._id) ? (
                  <p className="mt-2 text-green-600">Already Enrolled</p>
                ) : (
                  <button
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={() => handleEnroll(course._id)}
                  >
                    Enroll
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses available.</p>
        )}
      </main>
    </div>
  );
};

export default CourseEnrollmentPage;
