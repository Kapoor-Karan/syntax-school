import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentDashboard = ({ token }) => {
  const [coursesEnrolled, setCoursesEnrolled] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all necessary data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch enrolled courses
        const enrolledResponse = await fetch("/api/courses/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const enrolledData = await enrolledResponse.json();

        // Fetch all available courses
        const availableResponse = await fetch("/api/courses/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const availableData = await availableResponse.json();

        // Separate enrolled courses from all available courses
        const enrolledCourseIds = enrolledData.courses.map((course) => course._id);
        const filteredAvailableCourses = availableData.courses.filter(
          (course) => !enrolledCourseIds.includes(course._id)
        );

        setCoursesEnrolled(enrolledData.courses);
        setAvailableCourses(filteredAvailableCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Handle enrollment
  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to enroll in course");

      const updatedCourse = await response.json();
      // Update the state: move course from available to enrolled
      setCoursesEnrolled([...coursesEnrolled, updatedCourse.course]);
      setAvailableCourses(availableCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading dashboard...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Dashboard</h1>

      {/* Enrolled Courses Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
        {coursesEnrolled.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesEnrolled.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link
                  to={`/courses/${course._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Course
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        )}
      </section>

      {/* Available Courses Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
        {availableCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleEnroll(course._id)}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No courses available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
