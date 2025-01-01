import React from "react";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Instructor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Add Course</h2>
          <p className="text-gray-600 mb-4">
            Create new courses to help students learn effectively.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add Course
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Manage Courses
          </h2>
          <p className="text-gray-600 mb-4">
            View, update, or delete your existing courses.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Manage Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
