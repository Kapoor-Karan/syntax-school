import React from 'react';

const InstructorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Instructor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Courses Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Manage Courses</h2>
          <p className="text-gray-600 mb-4">
            Create, update, or delete courses to help students learn effectively.
          </p>
          <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Add New Course
          </button>
        </div>

        {/* Manage Quizzes Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Manage Quizzes</h2>
          <p className="text-gray-600 mb-4">
            Create and manage quizzes to evaluate students' understanding.
          </p>
          <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Add New Quiz
          </button>
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;
