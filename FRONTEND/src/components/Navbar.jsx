import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Syntax School</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-white hover:text-green-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/courses" className="text-white hover:text-green-400">
            Courses
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-green-400">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
