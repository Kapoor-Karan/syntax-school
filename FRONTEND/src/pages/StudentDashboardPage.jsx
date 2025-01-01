import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const StudentDashboard = () => {
  const [coursesEnrolled, setCoursesEnrolled] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("enrolled");
  const [videoUrl, setVideoUrl] = useState(""); 
  const [showPlayer, setShowPlayer] = useState(false); 
  const token = localStorage.getItem("token");

  // Fetch enrolled and available courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const enrolledResponse = await fetch(
          "http://localhost:3000/api/courses/enrolled",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const enrolledData = await enrolledResponse.json();

        const availableResponse = await fetch(
          "http://localhost:3000/api/courses/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const availableData = await availableResponse.json();

        const enrolledCourseIds = enrolledData.courses.map(
          (course) => course._id
        );
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

    fetchCourses();
  }, [token]);

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to enroll in course");

      const updatedCourse = await response.json();

      setCoursesEnrolled((prev) => [...prev, updatedCourse.course]);
      setAvailableCourses((prev) =>
        prev.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  // Handle view course
  const handleViewCourse = (url) => {
    setVideoUrl(url);
    setShowPlayer(true);
  };

  if (loading) {
    return <div className="text-center mt-20">Loading dashboard...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-6 py-2 rounded ${
            view === "enrolled" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`px-6 py-2 rounded ${
            view === "available" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("available")}
        >
          Available Courses
        </button>
      </div>

      {view === "enrolled" && (
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
                  <button
                    onClick={() => handleViewCourse(course.videoUrl)} 
                    className="text-blue-500 hover:underline"
                  >
                    View Course
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              You are not enrolled in any courses yet.
            </p>
          )}
        </section>
      )}

      {view === "available" && (
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
      )}

      {showPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ReactPlayer url={videoUrl} controls playing width="100%" />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowPlayer(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
