import React from 'react';

const Courses = () => {
  const courses = [
    { id: 1, title: 'Introduction to Programming', description: 'Learn the basics of programming.' },
    { id: 2, title: 'Data Structures and Algorithms', description: 'Master the fundamentals of data structures.' },
    { id: 3, title: 'Web Development', description: 'Build dynamic websites with modern technologies.' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Courses</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-700">{course.title}</h3>
            <p className="text-gray-500 mt-2">{course.description}</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
