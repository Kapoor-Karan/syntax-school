import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleAddCourse = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:3000/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add course");
      }
  
      const data = await response.json();
      if (data) {
        setCourses((prevCourses) => [...prevCourses, data]);
        setNewCourse({ title: "", description: "", videoUrl: "" });
      }
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert(error.message);
    }
  };
  

  const handleDeleteCourse = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/courses/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete course");
      }

      setCourses(courses.filter((course) => course._id !== id));
      alert("Course deleted successfully.");
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert(error.message);
    }
  };

  const handleUpdateCourse = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/api/courses/update/${editingCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingCourse),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course");
      }

      const data = await response.json();
      setCourses(
        courses.map((course) =>
          course._id === editingCourse._id ? data.updatedCourse : course
        )
      );
      setEditingCourse(null); 
    } catch (error) {
      console.error("Error updating course:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold">Course Management</h1>
      </header>
      <main className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Courses</h2>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Add New Course</h3>
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            className="mt-2 w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="mt-2 w-full p-2 border rounded-md"
          ></textarea>
          <input
            type="text"
            placeholder="Video URL"
            value={newCourse.videoUrl}
            onChange={(e) =>
              setNewCourse({ ...newCourse, videoUrl: e.target.value })
            }
            className="mt-2 w-full p-2 border rounded-md"
          />
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleAddCourse}
          >
            Add Course
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700">All Courses</h3>
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length > 0 ? (
            <ul className="mt-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="p-4 border rounded-md shadow-md mb-4"
                >
                  <h4 className="text-xl font-semibold">{course.title}</h4>
                  <p className="text-gray-600">{course.description}</p>
                  <a
                    href={course.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Watch Video
                  </a>
                  <div className="mt-2">
                    <button
                      className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => setEditingCourse(course)}
                    >
                      Update
                    </button>
                    <button
                      className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </main>

      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-lg font-medium text-gray-700">
              Update Course
            </h3>
            <input
              type="text"
              placeholder="Course Title"
              value={editingCourse.title}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, title: e.target.value })
              }
              className="mt-2 w-full p-2 border rounded-md"
            />
            <textarea
              placeholder="Course Description"
              value={editingCourse.description}
              onChange={(e) =>
                setEditingCourse({
                  ...editingCourse,
                  description: e.target.value,
                })
              }
              className="mt-2 w-full p-2 border rounded-md"
            ></textarea>
            <input
              type="text"
              placeholder="Video URL"
              value={editingCourse.videoUrl}
              onChange={(e) =>
                setEditingCourse({
                  ...editingCourse,
                  videoUrl: e.target.value,
                })
              }
              className="mt-2 w-full p-2 border rounded-md"
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-4"
                onClick={() => setEditingCourse(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleUpdateCourse}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagementPage;
